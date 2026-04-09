import React from "react";
import "../css/landing.css";

const ProcessSection = () => {
  return (
    <section className="process">
      <div className="process-header">
        <h2>How We Work</h2>
        <p>
          A clear, guided journey that takes you from insight to confident
          growth.
        </p>
      </div>

      <div className="process-path">
        <div className="process-card">
          <span className="step">01</span>
          <h3>Consult</h3>
          <p>We understand your goals and challenges.</p>
        </div>

        <div className="process-card">
          <span className="step">02</span>
          <h3>Plan</h3>
          <p>We create a clear, actionable strategy.</p>
        </div>

        <div className="process-card">
          <span className="step">03</span>
          <h3>Implement</h3>
          <p>We support execution step by step.</p>
        </div>

        <div className="process-card">
          <span className="step">04</span>
          <h3>Review</h3>
          <p>We assess progress and refine where needed.</p>
        </div>

        <div className="process-card">
          <span className="step">05</span>
          <h3>Grow</h3>
          <p>You move forward with confidence.</p>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
