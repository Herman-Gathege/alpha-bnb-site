import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSingleListing } from "../services/listingsService";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth/auth";
import api from "../api/axiosConfig";
import "../css/ListingDetails.css";

const ListingDetails = () => {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

const [checkIn, setCheckIn] = useState("");
const [checkOut, setCheckOut] = useState("");
const [guests, setGuests] = useState(1);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchListing();
  }, []);

  const fetchListing = async () => {
    try {
      const data = await getSingleListing(id);
      setListing(data);
    } catch (err) {
      console.error("Failed to load listing", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async () => {
  setError("");
  setSuccess("");

  // ❌ Basic validation
  if (!checkIn || !checkOut) {
    setError("Please select dates");
    return;
  }

  // 🔐 Not logged in → redirect
  if (!isAuthenticated()) {
    navigate(`/login?redirect=/listing/${id}`);
    return;
  }

  try {
    const res = await api.post("/bookings", {
      listing_id: id,
      check_in: checkIn,
      check_out: checkOut,
      guests: guests,
    });

    setSuccess("Booking request sent 🎉");

  } catch (err) {
    console.error(err);
    setError(err.response?.data?.msg || "Booking failed");
  }
};

  if (loading) return <p className="page-loading">Loading listing...</p>;
  if (!listing) return <p className="page-loading">Listing not found</p>;

  return (
    <>
      <Navbar />

      <div className="details-container">

        {/* ========= BREADCRUMBS ========= */}
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/listings">Listings</Link>
          <span>›</span>
          <span className="crumb-active">{listing.title}</span>
        </div>

        {/* ========= IMAGE GALLERY ========= */}
        <div className="details-gallery">
          {listing.images.map((img) => (
            <img key={img.id} src={img.image_url} alt={listing.title} />
          ))}
        </div>

        {/* ========= MAIN GRID ========= */}
        <div className="details-grid">
          {/* LEFT SIDE */}
          <div className="details-info">
            <h1>{listing.title}</h1>

            <p className="details-location">
              {listing.location_city}, {listing.location_area}
            </p>

            <div className="details-meta">
              <span>{listing.max_guests} guests</span>
              <span>{listing.bedrooms} bedrooms</span>
              <span>{listing.bathrooms} bathrooms</span>
            </div>

            <hr />

            <h2>About this stay</h2>
            <p className="details-description">{listing.description}</p>
          </div>

          {/* RIGHT SIDE BOOKING CARD */}
          <div className="booking-card">
            <h2>KES {listing.price_per_night} / night</h2>

            <div className="booking-form">
  <input
    type="date"
    value={checkIn}
    onChange={(e) => setCheckIn(e.target.value)}
  />

  <input
    type="date"
    value={checkOut}
    onChange={(e) => setCheckOut(e.target.value)}
  />

  <input
    type="number"
    placeholder="Guests"
    min="1"
    value={guests}
    onChange={(e) => setGuests(e.target.value)}
  />

  <button className="btn-primary" onClick={handleReserve}>
    Reserve
  </button>
  {error && <p style={{ color: "red" }}>{error}</p>}
{success && <p style={{ color: "green" }}>{success}</p>}
</div>

            <p className="booking-note">You won’t be charged yet</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ListingDetails;