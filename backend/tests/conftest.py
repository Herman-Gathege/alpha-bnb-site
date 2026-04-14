import pytest
from main import create_app
from extensions import db, bcrypt
from modules.auth.models import User
from modules.listings.models.listing import Listing
from modules.bookings.models.booking import Booking
from datetime import date




@pytest.fixture
def app():
    app = create_app()

    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
        "JWT_SECRET_KEY": "test-secret"
    })

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def user(app):
    with app.app_context():
        user = User(
            name="Test User",
            email="user@test.com"
        )
        user.set_password("password123")
        db.session.add(user)
        db.session.commit()
        return user.id


@pytest.fixture
def admin_token(app):
    with app.app_context():
        admin = User(
            name="Admin",
            email="admin@test.com",
            role="admin"
        )
        admin.set_password("password123")

        db.session.add(admin)
        db.session.commit()

        return admin.generate_token()
    


@pytest.fixture
def listing(app):
    with app.app_context():
        listing = Listing(
            title="Test Apartment",
            slug="test-apartment",
            description="Nice place",
            location_city="Nairobi",
            location_area="Westlands",
            price_per_night=50,
            cleaning_fee=0,
            service_fee=0,
            max_guests=2,
            is_active=True
        )
        db.session.add(listing)
        db.session.commit()
        return listing


@pytest.fixture
def booking(app, listing, user):
    with app.app_context():
        booking = Booking(
            listing_id=listing,
            user_id=user,
            check_in=date(2026, 5, 1),
            check_out=date(2026, 5, 5),
            total_price=200,
            status="pending"
        )
        db.session.add(booking)
        db.session.commit()
        return booking.id

