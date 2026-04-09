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
        <span className="hero-eyebrow">
          Business Growth • Compliance • Strategy
        </span>

        <h1>
          Helping Businesses Take <span>the Right Next Step</span>
        </h1>

        <p>
          SureStep Business supports entrepreneurs and growing companies with
          practical guidance, compliance support, and strategies that bring
          clarity, confidence, and sustainable growth.
        </p>

        <div className="hero-actions">
          <Link to="/contact" className="btn-primary">
            Book a Consultation
          </Link>
          <Link to="/services" className="btn-secondary">
            Explore Services
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
