//frontend/src/pages/admin/Bookings.jsx
import { useEffect, useState } from "react";
import {
  getBookings,
  approveBooking,
  rejectBooking,
  cancelBooking,
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
    <div className="dashboard-container admin-page">
      <div className="content">
        <h2>Bookings Management</h2>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Listing</th>
                <th>User</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Guests</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>#{b.id}</td>
                  <td className="listing-cell">{b.listing_title}</td>
                  <td className="email-cell">{b.user_email}</td>
                  <td>{b.check_in_date}</td>
                  <td>{b.check_out_date}</td>
                  <td>{b.guests_count}</td>
                  <td className="price-cell">KES {b.total_price}</td>
                  <td>
                    <span className={`booking-status ${b.status}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="btn-approve"
                      onClick={() => approveBooking(b.id)}
                    >
                      Approve
                    </button>

                    <button
                      className="btn-reject"
                      onClick={() => rejectBooking(b.id)}
                    >
                      Reject
                    </button>

                    <button
                      className="btn-cancel"
                      onClick={() => cancelBooking(b.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
