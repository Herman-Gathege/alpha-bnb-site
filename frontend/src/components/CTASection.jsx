import React from "react";
import { Link } from "react-router-dom";
import "../css/landing.css";

const CTASection = () => {
  return (
    <section className="cta">
      <h2>Take the Next Trip with Confidence</h2>
      <p>
        Whether you’re a first-time traveler or a seasoned explorer, <span style={{fontWeight: "700"}}>MySpaceByAlphaOne</span> is here to make your journey smoother and more enjoyable. Our expert guides, personalized recommendations, and seamless booking experience are designed to help you discover new places with confidence. Don’t let uncertainty hold you back – start your next adventure with us today!
      </p>

      <Link to="/contact">
        <button className="cta-btn">Get in Touch</button>
      </Link>
    </section>
  );
};

export default CTASection;
