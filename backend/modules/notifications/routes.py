from flask import Blueprint, jsonify

notifications_bp = Blueprint("notifications", __name__)

@notifications_bp.route("", methods=["GET"])
def get_notifications():
    # Example static notifications
    notifications = [
        {"id": 1, "title": "Welcome to SureStep!", "type": "info"},
        {"id": 2, "title": "New Service Added", "type": "success"}
    ]
    return jsonify(notifications)
