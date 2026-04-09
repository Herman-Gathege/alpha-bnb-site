# backend/modules/dashboard/routes.py
from flask import Blueprint, jsonify
from modules.leads.models import Lead
from modules.contact.models import ContactMessage


dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/dashboard")

@dashboard_bp.route("/leads", methods=["GET"])
def get_leads():
    leads = Lead.query.all()

    result = []
    for lead in leads:
        result.append({
            "id": lead.id,
            "name": lead.name,
            "email": lead.email,
            "source": lead.source,
            "ai_score": lead.ai_readiness.score if lead.ai_readiness else None,
            "messages": len(lead.contact_messages),
            "created_at": lead.created_at
        })

    return jsonify(result), 200

@dashboard_bp.route("/messages", methods=["GET"])
def get_messages():
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()

    data = [
        {
            "id": msg.id,
            "name": msg.name,
            "email": msg.email,
            "message": msg.message,
            "created_at": msg.created_at.isoformat(),
        }
        for msg in messages
    ]

    return jsonify(data), 200