// frontend/src/pages/About.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>About SureStep</h1>
        <p>This is a placeholder for the About page. Information about SureStep Business Advisors will go here.</p>
      </div>
      <Footer />
    </>
  );
};

export default About;
