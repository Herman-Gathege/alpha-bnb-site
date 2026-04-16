from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from flask import jsonify

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()   # ✅ THIS IS REQUIRED FIRST

        claims = get_jwt()

        user_role = claims.get("role", None)

        if claims.get("role") != "admin":
            return jsonify({"msg": "Admins only"}), 403

        return fn(*args, **kwargs)

    return wrapper