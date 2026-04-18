#backend/modules/admin/routes.py
from backend.modules.listings.models import listing
from flask import request, jsonify
from . import admin_bp
from backend.modules.core.admin_required import admin_required
from backend.modules.bookings.models.booking import Booking
from backend.modules.bookings.models.blocked_date import BlockedDate
from backend.modules.auth.models import User
from datetime import datetime, timedelta
from backend.extensions import db
from backend.modules.listings.models.listing import Listing
from backend.modules.listings.models.listing_image import ListingImage

# Admin route to create a new listing
@admin_bp.route("/listings", methods=["POST"])
@admin_required
def create_listing():
    data = request.get_json()

    # 1. Create listing first
    listing = Listing(
        title=data["title"],
        description=data.get("description"),
        location_city=data.get("location_city"),
        location_area=data.get("location_area"),

        price_per_night=data["price_per_night"],
        cleaning_fee=data.get("cleaning_fee", 0),
        service_fee=data.get("service_fee", 0),

        max_guests=data.get("max_guests", 2),
        bedrooms=data.get("bedrooms", 1),
        bathrooms=data.get("bathrooms", 1),

        is_active=True
    )

    db.session.add(listing)
    db.session.commit()  # ✅ IMPORTANT: generates listing.id

    # 2. Handle images (URLs for now / Cloudinary later)
    images = data.get("images", [])

    for i, url in enumerate(images):
        img = ListingImage(
            listing_id=listing.id,
            image_url=url,
            display_order=i
        )
        db.session.add(img)

    db.session.commit()

    return jsonify({
        "message": "Listing created",
        "listing_id": listing.id
    }), 201


# Admin route to get all listings with minimal info for management purposes
@admin_bp.route("/listings", methods=["GET"])
@admin_required
def get_all_listings_admin():
    listings = Listing.query.order_by(Listing.created_at.desc()).all()

    result = []
    for l in listings:
        result.append({
            "id": l.id,
            "title": l.title,
            "description": l.description,

            # ⚠️ MUST MATCH FRONTEND NAMES
            "location_city": l.location_city,
            "location_area": l.location_area,

            "price_per_night": l.price_per_night,
            "cleaning_fee": l.cleaning_fee,
            "service_fee": l.service_fee,

            "max_guests": l.max_guests,
            "bedrooms": l.bedrooms,
            "bathrooms": l.bathrooms,

            "is_active": l.is_active,
            "created_at": l.created_at,

            "total_images": len(l.images),
            "total_bookings": len(l.bookings),
            "blocked_days": len(l.blocked_dates),
            "images": [
                    {
                        "id": img.id,
                        "image_url": img.image_url,
                        "display_order": img.display_order
                    }
                    for img in sorted(l.images, key=lambda x: x.display_order)
                ],
        })

    return jsonify(result), 200

# Admin route to update a listing
@admin_bp.route("/listings/<int:listing_id>", methods=["PUT"])
@admin_required
def update_listing(listing_id):
    listing = Listing.query.get_or_404(listing_id)
    data = request.get_json()

    # Basic info
    listing.title = data.get("title", listing.title)
    listing.description = data.get("description", listing.description)
    listing.location_city = data.get("location_city", listing.location_city)
    listing.location_area = data.get("location_area", listing.location_area)

    # Pricing  ⭐⭐⭐ MISSING BEFORE
    listing.price_per_night = data.get("price_per_night", listing.price_per_night)
    listing.cleaning_fee = data.get("cleaning_fee", listing.cleaning_fee)
    listing.service_fee = data.get("service_fee", listing.service_fee)

    # Capacity
    listing.max_guests = data.get("max_guests", listing.max_guests)
    listing.bedrooms = data.get("bedrooms", listing.bedrooms)
    listing.bathrooms = data.get("bathrooms", listing.bathrooms)

    db.session.commit()

    return jsonify({"message": "Listing updated successfully"}), 200


# Admin route to toggle listing active status
@admin_bp.route("/listings/<int:listing_id>/toggle", methods=["PATCH"])
@admin_required
def toggle_listing(listing_id):
    listing = Listing.query.get_or_404(listing_id)
    listing.is_active = not listing.is_active
    db.session.commit()

    return jsonify({
        "message": "Listing status updated",
        "is_active": listing.is_active
    })

# Admin route to get all bookings for management purposes
# @admin_bp.route("/bookings", methods=["GET"])
# @admin_required
# def get_all_bookings():
#     bookings = Booking.query.order_by(Booking.created_at.desc()).all()

#     results = []
#     for b in bookings:
#         results.append({
#             "id": b.id,
#             "listing_id": b.listing_id,
#             "user_id": b.user_id,
#             "check_in": b.check_in,
#             "check_out": b.check_out,
#             "total_price": b.total_price,
#             "status": b.status,
#             "created_at": b.created_at
#         })

#     return jsonify(results), 200

@admin_bp.route("/bookings", methods=["GET"])
@admin_required
def get_all_bookings():
    bookings = Booking.query.order_by(Booking.created_at.desc()).all()

    results = []
    for b in bookings:
        listing = Listing.query.get(b.listing_id)
        user = User.query.get(b.user_id)

        results.append({
            "id": b.id,

            # 👇 HUMAN FRIENDLY DATA
            "listing_id": b.listing_id,
            "listing_title": listing.title if listing else "Deleted listing",

            "user_id": b.user_id,
            "user_email": user.email if user else "Deleted user",

            # 👇 CORRECT FIELD NAMES
            "check_in_date": b.check_in_date.isoformat(),
            "check_out_date": b.check_out_date.isoformat(),
            "guests_count": b.guests_count,

            "total_price": b.total_price,
            "status": b.status,
            "created_at": b.created_at.isoformat(),
        })

    return jsonify(results), 200


# Admin route to approve a booking
@admin_bp.route("/bookings/<int:booking_id>/approve", methods=["PATCH"])
@admin_required
def approve_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)

    if booking.status != "pending":
        return jsonify({"msg": "Booking already processed"}), 400

    booking.status = "confirmed"

    # ✅ Create ONE blocked range (correct approach)
    blocked = BlockedDate(
        listing_id=booking.listing_id,
        start_date=booking.check_in_date,
        end_date=booking.check_out_date,
        reason="booking"
    )
    db.session.add(blocked)

    db.session.commit()
    return jsonify({"msg": "Booking approved"})


# Admin route to reject a booking
@admin_bp.route("/bookings/<int:booking_id>/reject", methods=["PATCH"])
@admin_required
def reject_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)

    if booking.status != "pending":
        return jsonify({"msg": "Booking already processed"}), 400

    booking.status = "rejected"
    db.session.commit()

    return jsonify({"msg": "Booking rejected"})


# Admin route to cancel a booking
@admin_bp.route("/bookings/<int:booking_id>/cancel", methods=["PATCH"])
@admin_required
def cancel_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)

    if booking.status != "confirmed":
        return jsonify({"msg": "Only confirmed bookings can be cancelled"}), 400

    booking.status = "cancelled"

    # ✅ remove blocked range correctly
    BlockedDate.query.filter(
        BlockedDate.listing_id == booking.listing_id,
        BlockedDate.start_date == booking.check_in_date,
        BlockedDate.end_date == booking.check_out_date,
        BlockedDate.reason == "booking"
    ).delete()

    db.session.commit()

    return jsonify({"msg": "Booking cancelled"})


# Admin route to block specific dates for a listing (e.g. for maintenance)
@admin_bp.route("/block-dates", methods=["POST"])
@admin_required
def block_dates():
    data = request.get_json()

    listing_id = data["listing_id"]

    start_date = datetime.strptime(data["start_date"], "%Y-%m-%d").date()
    end_date = datetime.strptime(data["end_date"], "%Y-%m-%d").date()

    blocked = BlockedDate(
        listing_id=listing_id,
        start_date=start_date,
        end_date=end_date,
        reason="manual_block"
    )

    db.session.add(blocked)
    db.session.commit()

    return jsonify({"msg": "Dates blocked"}), 201


@admin_bp.route("/listings/<int:listing_id>/images", methods=["POST"])
@admin_required
def upload_listing_images(listing_id):
    from backend.modules.listings.models import Listing
    from backend.modules.listings.models.listing_image import ListingImage
    import cloudinary.uploader

    listing = Listing.query.get_or_404(listing_id)

    if "images" not in request.files:
        return jsonify({"error": "No images provided"}), 400

    files = request.files.getlist("images")

    uploaded_images = []

    for index, file in enumerate(files):
        result = cloudinary.uploader.upload(file)

        img = ListingImage(
            listing_id=listing.id,
            image_url=result["secure_url"],
            display_order=index
        )

        db.session.add(img)
        uploaded_images.append(result["secure_url"])

    db.session.commit()

    return jsonify({
        "message": "Images uploaded",
        "images": uploaded_images
    }), 201