# modules/core/models.py

from backend.extensions import db
from datetime import datetime

class BaseModel(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


# 🔽 Import all models so Alembic can detect them
from backend.modules.contact.models import ContactMessage
from backend.modules.leads.models import Lead
from backend.modules.ai_readiness.models import AIReadiness
