import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Smooth scroll when hash changes
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // Navigate and scroll to a section
  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>MySpaceByAlphaOne</h2>
          <p>
            Providing modern, safe, and fully serviced apartments across Kenya.
            Book, stay, and enjoy hassle-free hospitality with our{" "}
            <Link to="/login" className="footer-inline-link">
              properties
            </Link>
            .
          </p>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <ul>
            <li>
              <button onClick={() => scrollToSection("home")}>Home</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("featured")}>
                Featured BnB
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("reviews")}>Reviews</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("about")}>Meet the Host</button>
            </li>
            <li>
              <Link to="/listings">Listings</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/ai-readiness">Book a stay Today</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 MySpaceByAlphaOne. All rights reserved.</p>
        <div className="footer-policy">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span>|</span>
          <Link to="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;