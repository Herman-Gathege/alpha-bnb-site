def test_get_all_bookings(client, admin_token, booking):
    res = client.get(
        "/api/admin/bookings",
        headers={"Authorization": f"Bearer {admin_token}"}
    )

    assert res.status_code == 200
    assert len(res.get_json()) == 1


def test_approve_booking(client, admin_token, booking):
    res = client.patch(
        f"/api/admin/bookings/{booking.id}/approve",
        headers={"Authorization": f"Bearer {admin_token}"}
    )

    assert res.status_code == 200
    assert res.get_json()["msg"] == "Booking approved"



def test_reject_booking(client, admin_token, app, listing):
    from modules.bookings.models.booking import Booking
    from extensions import db
    from datetime import date

    with app.app_context():
        booking = Booking(
            listing_id=listing,
            user_id=1,
            check_in=date(2026,6,1),
            check_out=date(2026,6,3),
            total_price=100,
            status="pending"
        )
        db.session.add(booking)
        db.session.commit()

        booking_id = booking.id

    res = client.patch(
        f"/api/admin/bookings/{booking_id}/reject",
        headers={"Authorization": f"Bearer {admin_token}"}
    )

    assert res.status_code == 200


def test_cancel_booking(client, admin_token, app, listing):
    from modules.bookings.models.booking import Booking
    from extensions import db
    from datetime import date

    with app.app_context():
        booking = Booking(
            listing_id=listing,
            user_id=1,
            check_in=date(2026,7,1),
            check_out=date(2026,7,3),
            total_price=100,
            status="confirmed"
        )
        db.session.add(booking)
        db.session.commit()

        booking_id = booking.id

    res = client.patch(
        f"/api/admin/bookings/{booking_id}/cancel",
        headers={"Authorization": f"Bearer {admin_token}"}
    )

    assert res.status_code == 200


def test_block_dates(client, admin_token, listing):
    res = client.post(
        "/api/admin/block-dates",
        json={
            "listing_id": listing,
            "start_date": "2026-08-01",
            "end_date": "2026-08-03"
        },
        headers={"Authorization": f"Bearer {admin_token}"}
    )

    assert res.status_code == 200
    assert res.get_json()["msg"] == "Dates blocked"



