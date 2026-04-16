from flask import Blueprint, jsonify
from backend.modules.listings.models.listing import Listing

listings_bp = Blueprint("listings", __name__)

@listings_bp.route("/listings", methods=["GET"])
def get_public_listings():
    listings = Listing.query.filter_by(is_active=True)\
        .order_by(Listing.created_at.desc()).all()

    result = []

    for l in listings:
        result.append({
            "id": l.id,
            "title": l.title,
            "description": l.description,
            "location_city": l.location_city,
            "location_area": l.location_area,
            "price_per_night": l.price_per_night,

            # ✅ FIX: send full image array for slider
            "images": [
                {
                    "id": img.id,
                    "image_url": img.image_url,
                    "display_order": img.display_order
                }
                for img in sorted(l.images, key=lambda x: x.display_order)
            ],

            # optional fallback (keep if you still use it somewhere)
            "image_url": l.images[0].image_url if l.images else None
        })

    return jsonify(result), 200


@listings_bp.route("/listings/<int:listing_id>", methods=["GET"])
def get_single_listing(listing_id):
    listing = Listing.query.filter_by(id=listing_id, is_active=True).first()

    if not listing:
        return jsonify({"error": "Listing not found"}), 404

    # collect all images
    images = []
    for img in listing.images:
        images.append({
            "id": img.id,
            "image_url": img.image_url
        })

    data = {
        "id": listing.id,
        "title": listing.title,
        "description": listing.description,
        "location_city": listing.location_city,
        "location_area": listing.location_area,
        "price_per_night": listing.price_per_night,
        "cleaning_fee": listing.cleaning_fee,
        "service_fee": listing.service_fee,
        "max_guests": listing.max_guests,
        "bedrooms": listing.bedrooms,
        "bathrooms": listing.bathrooms,
        "images": images
    }

    return jsonify(data), 200