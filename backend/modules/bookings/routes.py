# backend/modules/bookings/routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

from backend.extensions import db
from backend.modules.listings.models import Listing
from backend.modules.bookings.models.booking import Booking
from backend.modules.bookings.models.blocked_date import BlockedDate
from backend.services.availability_service import AvailabilityService

bookings_bp = Blueprint("bookings", __name__)

@bookings_bp.route("/bookings/check-availability", methods=["POST"])
def check_availability():
    data = request.get_json()

    listing_id = data.get("listing_id")
    check_in = datetime.strptime(data.get("check_in"), "%Y-%m-%d").date()
    check_out = datetime.strptime(data.get("check_out"), "%Y-%m-%d").date()

    listing = Listing.query.get_or_404(listing_id)

    available, message = AvailabilityService.is_available(
        listing_id, check_in, check_out
    )

    if not available:
        return jsonify({"available": False, "message": message}), 400

    price = AvailabilityService.calculate_price(listing, check_in, check_out)

    return jsonify({
        "available": True,
        "pricing": price
    }), 200

@bookings_bp.route("/bookings", methods=["POST"])
@jwt_required()
def create_booking():
    user_id = get_jwt_identity()
    data = request.get_json()

    listing_id = data.get("listing_id")
    guests = data.get("guests")

    check_in = datetime.strptime(data.get("check_in"), "%Y-%m-%d").date()
    check_out = datetime.strptime(data.get("check_out"), "%Y-%m-%d").date()

    listing = Listing.query.get_or_404(listing_id)

    # check availability again (CRITICAL security)
    available, message = AvailabilityService.is_available(
        listing_id, check_in, check_out
    )

    if not available:
        return jsonify({"msg": message}), 400

    pricing = AvailabilityService.calculate_price(listing, check_in, check_out)

    booking = Booking(
        user_id=user_id,
        listing_id=listing_id,
        check_in_date=check_in,
        check_out_date=check_out,
        guests_count=guests,

        price_per_night_snapshot=listing.price_per_night,
        cleaning_fee_snapshot=listing.cleaning_fee,
        service_fee_snapshot=listing.service_fee,
        total_price=pricing["total_price"],
        status="pending"
    )

    db.session.add(booking)

    # block dates immediately
    blocked = BlockedDate(
        listing_id=listing_id,
        start_date=check_in,
        end_date=check_out,
        reason="booking"
    )
    db.session.add(blocked)

    db.session.commit()

    return jsonify({"message": "Booking request sent"}), 201

@bookings_bp.route("/bookings/my", methods=["GET"])
@jwt_required()
def my_bookings():
    user_id = get_jwt_identity()

    bookings = Booking.query.filter_by(user_id=user_id).all()

    result = []
    for b in bookings:
        result.append({
            "id": b.id,
            "listing": b.listing.title,
            "check_in": b.check_in_date,
            "check_out": b.check_out_date,
            "total_price": b.total_price,
            "status": b.status
        })

    return jsonify(result), 200

