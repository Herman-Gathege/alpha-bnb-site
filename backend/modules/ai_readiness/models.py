from backend.extensions import db
from datetime import datetime

class AIReadiness(db.Model):
    __tablename__ = "ai_readiness"

    id = db.Column(db.Integer, primary_key=True)
    lead_id = db.Column(db.Integer, db.ForeignKey("leads.id"), nullable=False)

    score = db.Column(db.Integer, nullable=False)
    percentage = db.Column(db.Integer, nullable=False)

    answers = db.Column(db.JSON, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
