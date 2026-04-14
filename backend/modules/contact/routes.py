# backend/modules/contact/routes.py
from flask import Blueprint, request, jsonify
from backend.extensions import db
from backend.modules.leads.models import Lead
from .models import ContactMessage


contact_bp = Blueprint("contact", __name__, url_prefix="/contact")


@contact_bp.route("", methods=["POST"])
def submit_contact():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not all([name, email, message]):
        return jsonify({"error": "All fields required"}), 400

    lead = Lead.query.filter_by(email=email).first()
    if not lead:
        lead = Lead(name=name, email=email, source="contact")
        db.session.add(lead)
        db.session.flush()

    contact_message = ContactMessage(
        lead_id=lead.id,
        name=name,
        email=email,
        message=message
    )

    db.session.add(contact_message)
    db.session.commit()

    return jsonify({"message": "Message saved"}), 201


# backend/modules/contact/routes.py
@contact_bp.route("/count", methods=["GET"])
def messages_count():
    from .models import ContactMessage
    count = ContactMessage.query.count()
    return jsonify({"count": count}), 200
