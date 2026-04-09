# backend/main.py
from flask import Flask
from extensions import db, bcrypt, jwt, migrate
from config import get_config
import modules.core.models
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(get_config())

    # Enable CORS
    # CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
    frontend_url = app.config.get(
        "FRONTEND_URL",
        "http://localhost:5173"
    )

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

    # Import & register blueprints
    from modules.auth.routes import auth_bp
    from modules.contact.routes import contact_bp
    from modules.leads.routes import leads_bp
    from modules.services.routes import services_bp
    from modules.dashboard.routes import dashboard_bp
    from modules.portfolio.routes import portfolio_bp
    from modules.notifications.routes import notifications_bp
    from modules.ai_readiness.routes import ai_bp


    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(contact_bp, url_prefix="/api/contact")
    app.register_blueprint(leads_bp, url_prefix="/api/leads")
    app.register_blueprint(services_bp, url_prefix="/api/services")
    app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")
    app.register_blueprint(portfolio_bp, url_prefix="/api/portfolio")
    app.register_blueprint(notifications_bp, url_prefix="/api/notifications")
    app.register_blueprint(ai_bp, url_prefix="/api/ai-readiness")


    @app.route("/")
    def index():
        return "Alpha-one backend is running!"

    return app
