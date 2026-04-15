import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPublicListings } from "../services/listingsService"; // adjust path if needed
import "../css/Listings.css";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const data = await getPublicListings();
      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load listings:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const featuredListings = listings.filter((l) => l.is_featured); // optional later
  const normalListings = listings.filter((l) => !l.is_featured);

  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="listings-hero">
        <div className="listings-hero-content">
          <h1>Our Listings</h1>
          <p className="listings-intro">
            Discover premium serviced apartments across Kenya.
          </p>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      {featuredListings.length > 0 && (
        <section className="featured-listing">
          {featuredListings.map((listing) => (
            <div key={listing.id} className="listing-card featured">
              <img
                src={listing.image_url || "/images/placeholder.jpg"}
                alt={listing.title}
              />

              <div className="listing-info">
                <h2>{listing.title}</h2>

                <p className="listing-location">
                  {listing.location_city}, {listing.location_area}
                </p>

                <p className="listing-desc">{listing.description}</p>

                <p className="listing-price">
                  KES {listing.price_per_night} / night
                </p>

                <a href={`/listing/${listing.id}`} className="btn-primary">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ================= ALL LISTINGS ================= */}
      <section className="other-listings">
        <h2>All Listings</h2>

        {loading ? (
          <p>Loading listings...</p>
        ) : (
          <div className="listings-grid">
            {normalListings.map((listing) => (
              <div key={listing.id} className="listing-card">
                <img
                  src={listing.image_url || "/images/placeholder.jpg"}
                  alt={listing.title}
                />

                <div className="listing-info">
                  <h3>{listing.title}</h3>

                  <p className="listing-location">
                    {listing.location_city}, {listing.location_area}
                  </p>

                  <p className="listing-price">
                    KES {listing.price_per_night} / night
                  </p>

                  <a href={`/listing/${listing.id}`} className="btn-primary">
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default Listings;