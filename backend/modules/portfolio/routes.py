from flask import Blueprint, request, jsonify
from .models import PortfolioItem
from extensions import db

portfolio_bp = Blueprint("portfolio", __name__)

@portfolio_bp.route("", methods=["POST"])
def add_item():
    data = request.get_json()
    item = PortfolioItem(
        title=data["title"],
        description=data.get("description"),
        image_url=data.get("image_url")
    )
    db.session.add(item)
    db.session.commit()
    return jsonify({"message": "Portfolio item added", "item": item.as_dict()}), 201

@portfolio_bp.route("", methods=["GET"])
def get_items():
    items = PortfolioItem.query.all()
    return jsonify([i.as_dict() for i in items])

@portfolio_bp.route("/<int:id>", methods=["PUT"])
def update_item(id):
    item = PortfolioItem.query.get_or_404(id)
    data = request.get_json()
    for field in ["title", "description", "image_url"]:
        if field in data:
            setattr(item, field, data[field])
    db.session.commit()
    return jsonify({"message": "Portfolio item updated", "item": item.as_dict()})

@portfolio_bp.route("/<int:id>", methods=["DELETE"])
def delete_item(id):
    item = PortfolioItem.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Portfolio item deleted"})
