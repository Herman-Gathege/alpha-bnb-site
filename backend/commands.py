from flask.cli import with_appcontext
import click
from backend.extensions import db
from backend.modules.auth.models import User

@click.command(name="create-admin")
@with_appcontext
def create_admin():
    """Create default admin user"""

    ADMIN_NAME = "Remington Admin"
    ADMIN_EMAIL = "admin@alphabnb.com"
    ADMIN_PASSWORD = "Admin@12345"

    existing = User.query.filter_by(email=ADMIN_EMAIL).first()
    if existing:
        print("✅ Admin already exists.")
        return

    admin = User(
        name=ADMIN_NAME,
        email=ADMIN_EMAIL,
        role="admin"
    )
    admin.set_password(ADMIN_PASSWORD)

    db.session.add(admin)
    db.session.commit()

    print("🎉 Default admin created!")
    print("Email:", ADMIN_EMAIL)
    print("Password:", ADMIN_PASSWORD)