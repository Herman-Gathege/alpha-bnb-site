import React from "react";
import { Link } from "react-router-dom";
import "../css/landing.css";

const AboutPreview = () => {
  return (
    <section id="about" className="about-preview">
      {/* Founder */}
      <div className="about-section founder">
        <div className="founder-grid">
          <img
            src="/images/eric.jpeg"
            alt="Eric Sirali, Your Host"
            className="founder-image"
          />

          <div>
            <h2 className="section-eyebrow">Meet Your Host</h2>
            <h3 className="founder-name">Eric Sirali</h3>
            <p className="founder-title">
              Superhost · 4 years hosting · 100% response rate
            </p>

            <blockquote>
              Providing modern, secure and comfortable serviced apartments
              designed to give guests a reliable and peaceful stay.
            </blockquote>

            <p>Speaks: English & Swahili</p>

            <p>
              Eric is an experienced entrepreneur and property host with over a
              decade of experience in building and scaling service-focused
              businesses. He has successfully applied technology to streamline
              operations, improve efficiency, and deliver top-tier experiences
              to guests. Recognized as an early adopter of digital solutions in
              traditional industries, Eric has been featured in Startup Nation
              and as a VIP Speaker at the AI Business Jumpstart Summit. He
              specializes in creating operational systems that ensure smooth,
              consistent guest experiences while maintaining high standards of
              safety, comfort, and reliability.
            </p>

            <div className="hero-actions">
              <Link to="/contact" className="cta-btn">
                Message Eric
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Track Record */}
      <div className="about-section">
        <h4 className="section-heading">Proven Track Record</h4>
        <ul>
          <li>
            Built and scaled service businesses nationally, integrating modern
            operational systems.
          </li>
          <li>
            Early adopter of digital technology to enhance service delivery.
          </li>
          <li>Featured in Startup Nation and AI Business Jumpstart Summit.</li>
          <li>
            Expert in operational systemization, guest experience, and team
            adoption.
          </li>
        </ul>
      </div>

      {/* Mission */}
      <div className="about-section mission">
        <h4 className="section-heading">Our Mission</h4>
        <p>
          To provide guests with modern, safe, and seamless stays while
          maintaining a reliable, fully-serviced apartment experience.
        </p>
      </div>

      {/* Contact */}
      <div className="about-section contact">
        <h4 className="section-heading">Get in Touch</h4>
        <div className="contact-grid">
          {/* <div>
            <span>Email</span>
            <a href="mailto:Colette@surestepbusiness.com">
              Colette@surestepbusiness.com
            </a>
          </div> */}

          <div>
            <span>Phone</span>
            <a href="tel:+254-777-735-509">(+254) 777-735-509</a>
          </div>

          <div>
            <span>LinkedIn</span>
            <a
              href="https://ke.linkedin.com/in/erick-sirali-85009712"
              target="_blank"
              rel="noreferrer"
            >
              Connect with Eric
            </a>
          </div>
        </div>
      </div>

      {/* Scoped CSS */}
      <style>{`
        .about-preview {
          max-width: 1100px;
          margin: 0 auto;
          padding: 3.5rem 1.5rem;
        }

        .about-section {
          margin-bottom: 22px;
        }

        /* Subtle section separation */
        .about-section:not(:first-child) {
          border-top: 1px solid #eee;
          padding-top: 18px;
        }

        /* Eyebrow heading */
        .section-eyebrow {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #B10F3A;
          margin-bottom: 4px;
        }

        .founder-name {
          font-size: 28px;
          margin: 0 0 4px;
          color: #111;
        }

        .founder-title {
          font-size: 13px;
          text-transform: uppercase;
          font-weight: 600;
          color: #777;
          margin-bottom: 10px;
        }

        .section-heading {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 6px;
          position: relative;
          padding-left: 10px;
        }

        .section-heading::before {
          content: "";
          position: absolute;
          left: 0;
          top: 4px;
          width: 3px;
          height: 14px;
          background: #B10F3A;
        }

        p {
          margin-bottom: 8px;
          line-height: 1.6;
          color: #333;
        }

        .founder-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 24px;
          align-items: flex-start;
        }

        .founder-image {
          width: 100%;
          border-radius: 8px;
        }

        blockquote {
          margin: 0 0 10px;
          padding-left: 14px;
          border-left: 3px solid #B10F3A;
          font-style: italic;
          color: #444;
        }

        ul {
          padding-left: 18px;
          margin: 4px 0 0;
        }

        li {
          margin-bottom: 6px;
          line-height: 1.5;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 10px;
        }

        .contact-grid span {
          display: block;
          font-size: 12px;
          text-transform: uppercase;
          font-weight: 600;
          color: #777;
          margin-bottom: 2px;
        }

        .contact-grid a {
          text-decoration: none;
          font-weight: 500;
          color: #111;
        }

        .contact-grid a:hover {
          color: #B10F3A;
        }

        @media (max-width: 768px) {
          .founder-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutPreview;
