//frontend/src/pages/admin/AdminDashboard.jsx
import { useState } from "react";
import Listings from "./Listings";
import Bookings from "./Bookings";
import BlockDates from "./BlockDates";
import "../../css/AdminDashboard.css";


export default function AdminDashboard() {
  const [tab, setTab] = useState("listings");

  return (
    <div className="dashboard-container">

      <div className="tabs">
        <button
          className={`tab-btn ${tab === "listings" ? "active" : ""}`}
          onClick={() => setTab("listings")}
        >
          Listings
        </button>

        <button
          className={`tab-btn ${tab === "bookings" ? "active" : ""}`}
          onClick={() => setTab("bookings")}
        >
          Bookings
        </button>

        <button
          className={`tab-btn ${tab === "blocks" ? "active" : ""}`}
          onClick={() => setTab("blocks")}
        >
          Block Dates
        </button>
      </div>

      <div className="content">
        {tab === "listings" && <Listings />}
        {tab === "bookings" && <Bookings />}
        {tab === "blocks" && <BlockDates />}
      </div>
    </div>
  );
}