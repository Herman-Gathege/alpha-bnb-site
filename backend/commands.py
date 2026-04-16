from flask.cli import with_appcontext
import click
from backend.extensions import db, bcrypt
from backend.modules.auth.models import User


@click.command(name="create-admin")
@click.option("--name", prompt="Admin name")
@click.option("--email", prompt="Admin email")
@click.option("--password", prompt=True, hide_input=True, confirmation_prompt=True)
@with_appcontext
def create_admin(name, email, password):
    """Create an admin user"""

    existing = User.query.filter_by(email=email).first()
    if existing:
        print("Admin already exists with that email.")
        return

    admin = User(
        name=name,
        email=email,
        role="admin"
    )
    admin.set_password(password)

    db.session.add(admin)
    db.session.commit()

    print("Admin created successfully!")