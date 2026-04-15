from flask import Blueprint, jsonify
from backend.modules.listings.models.listing import Listing

listings_bp = Blueprint("listings", __name__ )


@listings_bp.route("/listings", methods=["GET"])
def get_public_listings():
    listings = Listing.query.filter_by(is_active=True).order_by(Listing.created_at.desc()).all()

    result = []
    for l in listings:
        result.append({
            "id": l.id,
            "title": l.title,
            "description": l.description,
            "location_city": l.location_city,
            "location_area": l.location_area,
            "price_per_night": l.price_per_night,

            # safe optional extras
            "image_url": l.images[0].image_url if l.images else None
        })

    return jsonify(result), 200