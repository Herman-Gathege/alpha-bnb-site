import React from "react";
import { motion } from "framer-motion";
import { FaHandshake, FaChartLine, FaShieldAlt } from "react-icons/fa";
import "../css/landing.css";

const ValueSection = () => {
  const values = [
    {
      icon: <FaHandshake />,
      title: "Personalized Support",
      desc: "We work closely with you to understand your business and tailor solutions.",
    },
    {
      icon: <FaChartLine />,
      title: "Growth-Focused Strategy",
      desc: "Our approach is designed to help you grow with clarity and confidence.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Trusted & Reliable",
      desc: "We prioritize integrity, accuracy, and long-term success.",
    },
  ];

  return (
    <section className="modules">
      <h2>Why Choose SureStep</h2>

      <div className="module-grid">
        {values.map((item, idx) => (
          <motion.div
            key={idx}
            className="module-card"
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

export default ValueSection;
