import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/Listings.css";

const listings = [
  {
    id: 1,
    title: "Featured Bungoma Apartment",
    location: "Bungoma, Kenya",
    rating: 4.85,
    reviews: 13,
    image: "/images/hero11.jpeg",
    desc: "Modern, secure, and comfortable serviced apartment. Perfect for a peaceful stay with full amenities and reliable internet.",
    price: "KES 12,000 / night",
    link: "/listing/1",
    featured: true,
  },
  // Future listings can be added here
  // {
  //   id: 2,
  //   title: "Cozy Nairobi Studio",
  //   ...
  // },
];

const Listings = () => {
  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="listings-hero">
        <div className="listings-hero-content">
          <h1>Our Listings</h1>
          <p className="listings-intro">Discover our curated selection of premium serviced apartments.</p>
        </div>
      </section>

      {/* ================= FEATURED LISTING ================= */}
      <section className="featured-listing">
        {listings
          .filter((l) => l.featured)
          .map((listing) => (
            <div key={listing.id} className="listing-card featured">
              <img src={listing.image} alt={listing.title} />
              <div className="listing-info">
                <h2>{listing.title}</h2>
                <p className="listing-location">{listing.location}</p>
                <p className="listing-desc">{listing.desc}</p>
                <p className="listing-rating">
                  ⭐ {listing.rating} ({listing.reviews} reviews)
                </p>
                <p className="listing-price">{listing.price}</p>
                <a href={listing.link} className="btn-primary">
                  Book Now
                </a>
              </div>
            </div>
          ))}
      </section>

      {/* ================= OTHER LISTINGS ================= */}
      <section className="other-listings">
        <h2>More Listings</h2>
        <div className="listings-grid">
          {listings
            .filter((l) => !l.featured)
            .map((listing) => (
              <div key={listing.id} className="listing-card">
                <img src={listing.image} alt={listing.title} />
                <div className="listing-info">
                  <h3>{listing.title}</h3>
                  <p className="listing-location">{listing.location}</p>
                  <p className="listing-price">{listing.price}</p>
                  <a href={listing.link} className="btn-primary">
                    Book Now
                  </a>
                </div>
              </div>
            ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Listings;