//frontend/src/pages/admin/AdminDashboard.jsx
import { useState } from "react";
import Listings from "./Listings";
import Bookings from "./Bookings";
import BlockDates from "./BlockDates";

export default function AdminDashboard() {
  const [tab, setTab] = useState("listings");

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <button onClick={() => setTab("listings")}>Listings</button>
        <button onClick={() => setTab("bookings")}>Bookings</button>
        <button onClick={() => setTab("blocks")}>Block Dates</button>
      </div>

      <div className="content">
        {tab === "listings" && <Listings />}
        {tab === "bookings" && <Bookings />}
        {tab === "blocks" && <BlockDates />}
      </div>
    </div>
  );
}