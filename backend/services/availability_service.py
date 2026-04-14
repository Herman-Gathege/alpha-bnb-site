#backend/services/availability_service.py
from datetime import timedelta
from backend.models.booking import Booking
from backend.models.blocked_date import BlockedDate

class AvailabilityService:

    # -----------------------------------------
    # 1) Generate all dates between checkin/out
    # -----------------------------------------
    @staticmethod
    def generate_date_range(start_date, end_date):
        days = []
        current = start_date
        while current < end_date:
            days.append(current)
            current += timedelta(days=1)
        return days


    # -----------------------------------------
    # 2) Check booking overlaps
    # -----------------------------------------
    @staticmethod
    def has_booking_conflict(listing_id, check_in, check_out):

        conflict = Booking.query.filter(
            Booking.listing_id == listing_id,
            Booking.status != "cancelled",
            Booking.check_in_date < check_out,
            Booking.check_out_date > check_in
        ).first()

        return conflict is not None


    # -----------------------------------------
    # 3) Check manual blocked dates
    # -----------------------------------------
    @staticmethod
    def has_blocked_dates(listing_id, check_in, check_out):

        blocked = BlockedDate.query.filter(
            BlockedDate.listing_id == listing_id,
            BlockedDate.start_date < check_out,
            BlockedDate.end_date > check_in
        ).first()

        return blocked is not None


    # -----------------------------------------
    # 4) Master availability check
    # -----------------------------------------
    @staticmethod
    def is_available(listing_id, check_in, check_out):

        if check_out <= check_in:
            return False, "Checkout must be after checkin"

        if AvailabilityService.has_booking_conflict(listing_id, check_in, check_out):
            return False, "Dates already booked"

        if AvailabilityService.has_blocked_dates(listing_id, check_in, check_out):
            return False, "Dates unavailable"

        return True, "Available"


    # -----------------------------------------
    # 5) Calculate price
    # -----------------------------------------
    @staticmethod
    def calculate_price(listing, check_in, check_out):

        nights = (check_out - check_in).days

        base_price = nights * listing.price_per_night
        cleaning = listing.cleaning_fee
        service = listing.service_fee

        total = base_price + cleaning + service

        return {
            "nights": nights,
            "base_price": base_price,
            "cleaning_fee": cleaning,
            "service_fee": service,
            "total_price": total
        }