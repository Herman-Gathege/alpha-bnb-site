import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css"; // we'll style it separately

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>SureStep Business Advisors</h2>
          <p>
            Helping 7 - 8 figure service companies simplify{" "}
            <Link to="/dashboard" className="footer-inline-link">
              operations
            </Link>
            , integrate AI systems, and scale without chaos.
          </p>

        </div>

        <div className="footer-links">
          <h3>Services</h3>
          <ul>
            <li><Link to="/ai-readiness">AI Readiness Review</Link></li>
            <li><Link to="/services">Automation & System Design</Link></li>
            <li><Link to="/services#team-training">Team Training</Link></li>
            <li><Link to="/services">Knowledge Hub AI</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 SureStep Business Advisors. All rights reserved.</p>
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
