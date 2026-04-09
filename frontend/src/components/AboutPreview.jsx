const AboutPreview = () => {
  return (
    <section id="about" className="about-preview">
      {/* Founder */}
      <div className="about-section founder">
        <div className="founder-grid">
          <img
            src="/images/colette-kemp.jpg"
            alt="Colette Kemp, Founder of SureStep Business Advisors"
            className="founder-image"
          />

          <div>
            <h2 className="section-eyebrow">Meet Our Founder</h2>
            <h3 className="founder-name">Colette Kemp</h3>
            <p className="founder-title">
              Founder of SureStep Business Advisors
            </p>

            <blockquote>
              “When I ran my own skilled-trade business, the only way to grow was
              to replace paper checklists and manual tasks with cloud-based
              systems that kept the team aligned wherever they were.”
            </blockquote>

            <p>
              Since then, I've grown into a consulting role where I've been
              helping owners value and sell their businesses.
            </p>

            <p>
              By building digital assets and scalable systems now, you're
              creating a business that's truly sellable when you're ready to
              step back.
            </p>
          </div>
        </div>
      </div>

      {/* Track Record */}
      <div className="about-section">
        <h4 className="section-heading">Proven Track Record</h4>
        <ul>
          <li>Grew a service business nationally by shifting operations into the cloud</li>
          <li>Early adopter of technology in traditional, blue-collar industries</li>
          <li>Featured in Startup Nation & VIP Speaker at AI Business Jumpstart Summit</li>
          <li>Specialist in operational systemization and team adoption</li>
        </ul>
      </div>

      {/* Mission */}
      <div className="about-section mission">
        <h4 className="section-heading">Our Mission</h4>
        <p>
          To help owners of growing and established service companies build
          reliable systems that make their businesses efficient, profitable,
          less owner-dependent, and more valuable.
        </p>
      </div>

      {/* Contact */}
      <div className="about-section contact">
        <h4 className="section-heading">Get in Touch</h4>
        <div className="contact-grid">
          <div>
            <span>Email</span>
            <a href="mailto:Colette@surestepbusiness.com">
              Colette@surestepbusiness.com
            </a>
          </div>

          <div>
            <span>Phone</span>
            <a href="tel:18049208897">(804) 920-8897</a>
          </div>

          <div>
            <span>LinkedIn</span>
            <a href="https://www.linkedin.com/in/colettekemp/" target="_blank" rel="noreferrer">
              Connect with Colette
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
