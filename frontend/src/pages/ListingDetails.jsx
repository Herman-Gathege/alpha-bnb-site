import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSingleListing } from "../services/listingsService";
import "../css/ListingDetails.css";

const ListingDetails = () => {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

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
              <input type="date" />
              <input type="date" />
              <input type="number" placeholder="Guests" min="1" />
              <button className="btn-primary">Reserve</button>
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