#backend/modules/bookings/models/blocked_date.py
from backend.extensions import db

class BlockedDate(db.Model):
    __tablename__ = "blocked_dates"

    id = db.Column(db.Integer, primary_key=True)

    listing_id = db.Column(db.Integer, db.ForeignKey("listings.id"), nullable=False)

    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)

    reason = db.Column(db.String(50))  # booking or manual_block