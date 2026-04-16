//frontend/src/pages/admin/Bookings.jsx
import { useEffect, useState } from "react";
import {
  getBookings,
  approveBooking,
  rejectBooking,
  cancelBooking
} from "../../services/adminService";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  const load = async () => {
    const data = await getBookings();
    setBookings(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Bookings</h2>

      {bookings.map((b) => (
        <div key={b.id}>
          <p>Listing: {b.listing_id}</p>
          <p>Status: {b.status}</p>

          <button onClick={() => approveBooking(b.id)}>Approve</button>
          <button onClick={() => rejectBooking(b.id)}>Reject</button>
          <button onClick={() => cancelBooking(b.id)}>Cancel</button>
        </div>
      ))}
    </div>
  );
}