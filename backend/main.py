# backend/main.py
from flask import Flask
from backend.extensions import db, bcrypt, jwt, migrate
from backend.config import get_config
from backend.commands import create_admin
import backend.modules.core.models
from flask_cors import CORS


def create_app(config_name=None):
    app = Flask(__name__)

    # Allow pytest to pass "testing"
    if config_name:
        app.config.from_object(get_config(config_name))
    else:
        app.config.from_object(get_config())

    app.cli.add_command(create_admin)

    frontend_url = app.config.get("FRONTEND_URL", "http://localhost:5173")

    CORS(
        app,
        resources={r"/api/*": {"origins": frontend_url}},
        supports_credentials=True
    )

    # Init extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # Blueprints
    from backend.modules.auth.routes import auth_bp
    from backend.modules.contact.routes import contact_bp
    from backend.modules.leads.routes import leads_bp
    from backend.modules.services.routes import services_bp
    from backend.modules.dashboard.routes import dashboard_bp
    from backend.modules.portfolio.routes import portfolio_bp
    from backend.modules.notifications.routes import notifications_bp
    from backend.modules.ai_readiness.routes import ai_bp
    from backend.modules.admin import admin_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(contact_bp, url_prefix="/api/contact")
    app.register_blueprint(leads_bp, url_prefix="/api/leads")
    app.register_blueprint(services_bp, url_prefix="/api/services")
    app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")
    app.register_blueprint(portfolio_bp, url_prefix="/api/portfolio")
    app.register_blueprint(notifications_bp, url_prefix="/api/notifications")
    app.register_blueprint(ai_bp, url_prefix="/api/ai-readiness")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")

    @app.route("/")
    def index():
        return "Alpha-one backend is running!"

    return app