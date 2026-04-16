from backend.extensions import db
from datetime import datetime

class Lead(db.Model):
    __tablename__ = "leads"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    email = db.Column(db.String(150), unique=True, nullable=False)
    source = db.Column(db.String(50))  # contact | ai_readiness
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # ✅ Relationships (NOW VALID)
    contact_messages = db.relationship(
        "ContactMessage",
        backref="lead",
        lazy=True,
        cascade="all, delete-orphan"
    )

    ai_readiness = db.relationship(
        "AIReadiness",
        backref="lead",
        uselist=False,
        cascade="all, delete-orphan"
    )
