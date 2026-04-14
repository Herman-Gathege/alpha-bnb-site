#backend/modules/bookings/models/booking.py
from backend.extensions import db
from datetime import datetime

class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey("listings.id"), nullable=False)

    check_in_date = db.Column(db.Date, nullable=False)
    check_out_date = db.Column(db.Date, nullable=False)
    guests_count = db.Column(db.Integer, nullable=False)

    # Snapshot pricing (VERY IMPORTANT)
    price_per_night_snapshot = db.Column(db.Float, nullable=False)
    cleaning_fee_snapshot = db.Column(db.Float, nullable=False)
    service_fee_snapshot = db.Column(db.Float, nullable=False)
    total_price = db.Column(db.Float, nullable=False)

    status = db.Column(db.String(20), default="pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Booking {self.id}>"