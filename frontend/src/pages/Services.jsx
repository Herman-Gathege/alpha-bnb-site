import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/Services.css";

const Services = () => {
  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="services-hero">
        <div className="services-hero-content">
          <h1>Our Services</h1>
          <p>
            We help established service businesses eliminate owner dependency,
            streamline operations, and scale with confidence using practical AI
            and automation.
          </p>
        </div>
      </section>

      {/* ================= CORE SERVICES ================= */}
      <section className="services-core">
        <div className="services-grid">
          <div className="service-card">
            <h3>Operations & Process Optimization</h3>
            <p>
              We document how your business actually runs, identify operational
              gaps, and design systems that remove daily friction.
            </p>
            <ul>
              <li>Process documentation & SOPs</li>
              <li>Workflow mapping</li>
              <li>Operational gap analysis</li>
            </ul>
          </div>

          <div className="service-card">
            <h3>Automation & AI System Design</h3>
            <p>
              We build reliable automations that handle repetitive tasks so your
              team can focus on revenue-generating work.
            </p>
            <ul>
              <li>Automated follow-ups & scheduling</li>
              <li>Admin & data entry automation</li>
              <li>Tool integration with existing systems</li>
            </ul>
          </div>

          <div className="service-card">
            <h3>Team Training & Adoption</h3>
            <p>
              Systems only work when people use them. We train your team to adopt
              new tools confidently and consistently.
            </p>
            <ul>
              <li>Live team training sessions</li>
              <li>Step-by-step documentation</li>
              <li>On-demand video guides</li>
            </ul>
          </div>

          <div className="service-card">
            <h3>Knowledge Hub AI</h3>
            <p>
              We centralize your company knowledge into a private AI-powered hub
              that keeps operations running even when key people are out.
            </p>
            <ul>
              <li>Searchable workflows & SOPs</li>
              <li>Internal AI knowledge assistant</li>
              <li>Faster decision-making</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= FRAMEWORK ================= */}
      <section className="services-framework">
        <h2>The SureStep Smooth Operations Plan</h2>
        <p className="framework-intro">
          Our four-step done-for-you framework helps your business shift from
          chaos to clarity. Start at any step, or complete all four for a fully
          optimized operation.
        </p>

        <div className="framework-steps">
          <div className="framework-card">
            <span>Step 1</span>
            <h3>Operations & AI Recommendations Review</h3>
            <p>
              We map your entire business—people, tools, and processes—and
              deliver a clear blueprint for turning it into an AI-powered
              operation.
            </p>
            <strong>$5,000</strong>
          </div>

          <div className="framework-card">
            <span>Step 2</span>
            <h3>BUILD – Automate the Grind</h3>
            <p>
              We build and launch automations that remove repetitive tasks and
              free your team to focus on growth.
            </p>
            <strong>Starting at $7,500</strong>
          </div>

          <div className="framework-card">
            <span>Step 3</span>
            <h3>TRAIN – Make It Stick</h3>
            <p>
              We train your team through hands-on sessions, documentation, and
              follow-ups to ensure full adoption.
            </p>
            <strong>Starting at $3,500</strong>
          </div>

          <div className="framework-card">
            <span>Step 4</span>
            <h3>SYSTEMIZE – Self-Running Business</h3>
            <p>
              We centralize your knowledge into an AI-powered hub so operations
              run smoothly without constant oversight.
            </p>
            <strong>Starting at $15,000</strong>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="services-cta">
        <h2>Ready to Get Your Time Back?</h2>
        <p>
          Start with a free 30-minute strategy call. We’ll show you exactly where
          your operations can be streamlined.
        </p>
        <a href="/contact" className="btn-primary">
          Book Your Free Strategy Call
        </a>
      </section>

      <Footer />
    </>
  );
};

export default Services;
