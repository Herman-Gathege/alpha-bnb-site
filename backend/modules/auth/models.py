#backend/modules/auth/models.py
from backend.extensions import db, bcrypt
from flask_jwt_extended import create_access_token
from datetime import timedelta, datetime

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    # basic info
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    phone = db.Column(db.String(50))

    # auth
    password_hash = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(50), default="user")  # user / admin
    is_active = db.Column(db.Boolean, default=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # relationships (CRITICAL for bookings)
    bookings = db.relationship("Booking", backref="user", lazy=True)

    # ---------------- PASSWORD METHODS ----------------
    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    # ---------------- JWT TOKEN ----------------
    def generate_token(self):
        return create_access_token(
            identity=str(self.id),
            additional_claims={
                "role": self.role
            },
            expires_delta=timedelta(days=1)
        )

        