import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../css/landing.css";

const HeroSection = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-overlay" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="hero-eyebrow">Luxury • Comfort • Reliable Stays</span>

        <h1>
          Find Your Perfect <span>Stay in Kenya</span>
        </h1>

        <p>
          Modern, fully serviced apartments designed for comfort, security, and
          convenience whether you're traveling for work or leisure.
        </p>

        <div className="hero-actions">
          <Link to="/contact" className="btn-primary">
            Check Availability
          </Link>
          <Link to="/listings" className="btn-secondary">
            Explore Apartments
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
