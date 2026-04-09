import "../css/LegalPages.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsOfService = () => {
  return (
    <div className="legal-page">
      <Navbar />

      <main className="legal-container">
        <h1>Terms of Service</h1>

        <p>
          By accessing the SureStep Business Advisors website, you agree
          to comply with the following terms and conditions.
        </p>

        <h2>Use of Website</h2>
        <p>
          You agree to use this website only for lawful purposes and in
          accordance with applicable regulations.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content and materials on this site are owned by SureStep
          Business Advisors and may not be reproduced without permission.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          SureStep Business Advisors is not liable for any damages arising
          from the use of this website.
        </p>

        <h2>Updates to Terms</h2>
        <p>
          These terms may be updated periodically. Continued use of the
          site indicates acceptance of the revised terms.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
