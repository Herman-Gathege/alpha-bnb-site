import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaShieldAlt, FaUsers } from "react-icons/fa";
import "../css/landing.css";

const ServicesSection = () => {
  const services = [
    {
      icon: <FaBriefcase />,
      title: "Business Advisory",
      desc: "Practical guidance to help you make informed decisions and grow sustainably.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Compliance & Registration",
      desc: "We help you stay compliant with regulations and handle business registrations.",
    },
    {
      icon: <FaUsers />,
      title: "Operational Support",
      desc: "Streamline processes, improve efficiency, and strengthen your operations.",
    },
  ];

  return (
    <section id="services" className="features">
      <h2>What We Do</h2>
  
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
