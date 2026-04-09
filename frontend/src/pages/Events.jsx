import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/Events.css";

const Events = () => {
  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="events-hero">
        <div className="events-hero-content">
          <h1>Events & Workshops</h1>
          <p>
            Join our live sessions where we break down operations, automation,
            and AI systems in a practical, business-first way.
          </p>
        </div>
      </section>

      {/* ================= UPCOMING EVENTS ================= */}
      <section className="events-section">
        <h2>Upcoming Events</h2>
        <p className="events-intro">
          These sessions are designed for service business owners who want
          clarity, systems, and time freedom — without tech overwhelm.
        </p>

        <div className="events-grid">
          <div className="event-card">
            <span className="event-tag">Live Workshop</span>
            <h3>How to Build a Self-Running Operations System</h3>
            <p className="event-date">📅 March 15, 2026 • Online</p>
            <p>
              Learn how to document, automate, and systemize your business so it
              runs smoothly without constant oversight.
            </p>
            <a href="/contact" className="event-link">
              Reserve Your Spot →
            </a>
          </div>

          <div className="event-card">
            <span className="event-tag">Webinar</span>
            <h3>AI for Service Businesses (Without the Hype)</h3>
            <p className="event-date">📅 April 3, 2026 • Online</p>
            <p>
              A practical walkthrough of how AI can reduce admin work, improve
              decision-making, and support your team.
            </p>
            <a href="/contact" className="event-link">
              Register Now →
            </a>
          </div>

          <div className="event-card muted">
            <span className="event-tag muted">Coming Soon</span>
            <h3>Team Training Intensive</h3>
            <p className="event-date">📅 Date To Be Announced</p>
            <p>
              A hands-on training experience designed to help your team adopt
              new systems confidently.
            </p>
            <span className="event-link disabled">Details Coming Soon</span>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="events-cta">
        <h2>Want to Be Notified About Future Events?</h2>
        <p>
          Get early access to workshops, webinars, and private training
          sessions.
        </p>
        <a href="/contact" className="btn-primary">
          Join the Mailing List
        </a>
      </section>

      <Footer />
    </>
  );
};

export default Events;
