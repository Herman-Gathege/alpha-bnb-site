# backend/modules/ai_readiness/routes.py
from flask import Blueprint, request, jsonify
from extensions import db

from modules.leads.models import Lead
from modules.ai_readiness.models import AIReadiness
from modules.ai_readiness.questions import QUESTIONS
from modules.ai_readiness.utils import (
    calculate_score,
    readiness_status,
    cta_message
)

ai_bp = Blueprint("ai_readiness", __name__, url_prefix="/api/ai-readiness")

@ai_bp.route("/questions", methods=["GET"])
def get_questions():
    return jsonify(QUESTIONS)

@ai_bp.route("/submit", methods=["POST"])
def submit_ai_readiness():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    answers = data.get("answers")

    if not name or not email or not answers:
        return {"error": "Missing required fields"}, 400

    # 1️⃣ Lead
    lead = Lead.query.filter_by(email=email).first()
    if not lead:
        lead = Lead(
            name=name,
            email=email,
            source="ai_readiness"
        )
        db.session.add(lead)
        db.session.flush()

    # 2️⃣ Score
    score, percentage = calculate_score(answers)

    # 3️⃣ Save readiness
    ai = AIReadiness(
        lead_id=lead.id,
        answers=answers,
        score=score,
        percentage=percentage
    )
    db.session.add(ai)
    db.session.commit()

    # 4️⃣ Respond
    return {
        "score": score,
        "percentage": percentage,
        "status": readiness_status(percentage),
        "cta": cta_message(percentage)
    }, 201


# New route to get all AI readiness submissions for dashboard
@ai_bp.route("", methods=["GET"])  # notice empty string instead of "/"
def get_all_submissions():
    submissions = AIReadiness.query.all()
    result = []
    for s in submissions:
        lead = Lead.query.get(s.lead_id)
        result.append({
            "id": s.id,
            "company_name": lead.name if lead else "N/A",
            "score": s.score,
            "percentage": s.percentage,
            "company_size": getattr(s, "company_size", "N/A"),
            "answers_summary": getattr(s, "answers_summary", str(s.answers)),
        })
    return jsonify(result), 200


# backend/modules/ai_readiness/routes.py
@ai_bp.route("/count", methods=["GET"])
def ai_readiness_count():
    from modules.ai_readiness.models import AIReadiness
    count = AIReadiness.query.count()
    return jsonify({"count": count}), 200
