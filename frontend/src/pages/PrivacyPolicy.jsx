import { Link } from "react-router-dom";
import "../css/LegalPages.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <Navbar />

      <main className="legal-container">
        <h1>Privacy Policy</h1>

        <p>
          SureStep Business Advisors is committed to protecting your
          privacy. This policy outlines how we collect, use, and protect
          your personal information.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We may collect personal details such as your name, email
          address, company information, and usage data when you interact
          with our services.
        </p>

        <h2>Use of Information</h2>
        <ul>
          <li>To provide and improve our services</li>
          <li>To communicate with you</li>
          <li>To improve website performance</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We take reasonable measures to protect your information from
          unauthorized access or disclosure.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this policy, please reach out through our{" "}
          <Link to="/contact">contact page</Link>.
        </p>

      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
