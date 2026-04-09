import React from "react";
import { Link } from "react-router-dom";
import "../css/landing.css";

const CTASection = () => {
  return (
    <section className="cta">
      <h2>Take the Next Step with Confidence</h2>
      <p>
        Whether you're starting out or scaling up, SureStep is here to guide you.
      </p>

      <Link to="/contact">
        <button className="cta-btn">Get in Touch</button>
      </Link>
    </section>
  );
};

export default CTASection;
