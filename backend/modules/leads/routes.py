from flask import Blueprint, jsonify, request
from backend.extensions import db
from .models import Lead

leads_bp = Blueprint("leads", __name__, url_prefix="/leads")


@leads_bp.route("", methods=["GET"])
def get_all_leads():
    leads = Lead.query.order_by(Lead.created_at.desc()).all()

    return jsonify([
        {
            "id": lead.id,
            "name": lead.name,
            "email": lead.email,
            "source": lead.source,
            "created_at": lead.created_at
        }
        for lead in leads
    ]), 200


@leads_bp.route("/<int:lead_id>", methods=["GET"])
def get_lead(lead_id):
    lead = Lead.query.get_or_404(lead_id)

    return jsonify({
        "id": lead.id,
        "name": lead.name,
        "email": lead.email,
        "source": lead.source,
        "messages": [
            {
                "message": m.message,
                "created_at": m.created_at
            } for m in lead.contact_messages
        ],
        "ai_readiness": {
            "score": lead.ai_readiness.score,
            "answers": lead.ai_readiness.answers
        } if lead.ai_readiness else None
    }), 200

@leads_bp.route("/count", methods=["GET"])
def leads_count():
    count = Lead.query.count()
    return jsonify({"count": count}), 200