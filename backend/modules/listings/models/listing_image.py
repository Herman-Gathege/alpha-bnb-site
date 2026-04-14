#backend/modules/listings/models/listing_image.py
from backend.extensions import db

class ListingImage(db.Model):
    __tablename__ = "listing_images"

    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey("listings.id"), nullable=False)

    image_url = db.Column(db.String(500), nullable=False)
    display_order = db.Column(db.Integer, default=0)