#backend/modules/listings/models.py
from backend.extensions import db
from datetime import datetime

class Listing(db.Model):
    __tablename__ = "listings"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(200), nullable=False)
    slug = db.Column(db.String(200), unique=True)

    description = db.Column(db.Text, nullable=False)

    location_city = db.Column(db.String(100), nullable=False)
    location_area = db.Column(db.String(100), nullable=False)

    price_per_night = db.Column(db.Float, nullable=False)
    cleaning_fee = db.Column(db.Float, default=0)
    service_fee = db.Column(db.Float, default=0)

    max_guests = db.Column(db.Integer, nullable=False)
    bedrooms = db.Column(db.Integer)
    bathrooms = db.Column(db.Integer)

    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    images = db.relationship("ListingImage", backref="listing", lazy=True, cascade="all, delete-orphan")
    bookings = db.relationship("Booking", backref="listing", lazy=True)
    blocked_dates = db.relationship("BlockedDate", backref="listing", lazy=True)

    def __repr__(self):
        return f"<Listing {self.title}>"