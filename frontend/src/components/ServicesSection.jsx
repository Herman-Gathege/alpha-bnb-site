import React from "react";
import { motion } from "framer-motion";
import { FaWifi, FaParking, FaKey } from "react-icons/fa";
import "../css/landing.css";

const ServicesSection = () => {
  const services = [
    {
      icon: <FaKey />,
      title: "Self Check-In",
      desc: "Enjoy flexible arrival with secure lockbox access so you can check in at your convenience.",
    },
    {
      icon: <FaWifi />,
      title: "Fast Wi-Fi & Workspace",
      desc: "Reliable high-speed internet and a dedicated workspace perfect for remote work and business travel.",
    },
    {
      icon: <FaParking />,
      title: "Secure Free Parking",
      desc: "Gated parking with 24-hour security for peace of mind throughout your stay.",
    },
  ];

  return (
    <section id="services" className="features">
      <h2>What Guests Love</h2>

      <div className="feature-grid">
        {services.map((item, idx) => (
          <motion.div
            key={idx}
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
          >
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
