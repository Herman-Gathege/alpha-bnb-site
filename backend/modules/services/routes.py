from flask import Blueprint, request, jsonify
from .models import Service
from backend.extensions import db

services_bp = Blueprint("services", __name__)

@services_bp.route("", methods=["POST"])
def add_service():
    data = request.get_json()
    service = Service(title=data["title"], description=data["description"])
    db.session.add(service)
    db.session.commit()
    return jsonify({"message": "Service added", "service": service.as_dict()}), 201

@services_bp.route("", methods=["GET"])
def get_services():
    services = Service.query.all()
    return jsonify([s.as_dict() for s in services]), 200

@services_bp.route("/<int:id>", methods=["PUT"])
def update_service(id):
    service = Service.query.get_or_404(id)
    data = request.get_json()
    if "title" in data:
        service.title = data["title"]
    if "description" in data:
        service.description = data["description"]
    db.session.commit()
    return jsonify({"message": "Service updated", "service": service.as_dict()})

@services_bp.route("/<int:id>", methods=["DELETE"])
def delete_service(id):
    service = Service.query.get_or_404(id)
    db.session.delete(service)
    db.session.commit()
    return jsonify({"message": "Service deleted"}), 200
