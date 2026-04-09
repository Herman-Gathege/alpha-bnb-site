import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import ValueSection from "../components/ValueSection";
import ProcessSection from "../components/ReviewSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import AboutPreview from "../components/AboutPreview";


const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ValueSection />
      <ProcessSection />
      <AboutPreview  />
      <CTASection />
      <Footer />
    </>
  );
};

export default Home;
