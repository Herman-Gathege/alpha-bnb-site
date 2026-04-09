import React from "react";
import { motion } from "framer-motion";
import "../css/landing.css";

import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaHome,
  FaMapMarkerAlt,
} from "react-icons/fa";

import img1 from "../assets/bungoma/bungoma1.jpg";
import img2 from "../assets/bungoma/bungoma2.jpg";
import img3 from "../assets/bungoma/bungoma3.jpg";
import img4 from "../assets/bungoma/bungoma4.jpg";
import img5 from "../assets/bungoma/bungoma5.jpg";

const ValueSection = () => {
  const images = [img1, img2, img3, img4, img5];
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const values = [
    {
      icon: <FaStar />,
      title: "Guest Favourite",
      desc: "Rated 4.85★ from real guest stays. Loved for cleanliness, comfort and responsive hosting.",
    },
    {
      icon: <FaHome />,
      title: "Entire Serviced Apartment",
      desc: "1 bedroom apartment with workspace, balcony, fast Wi-Fi and modern custom furniture.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Prime Bungoma Location",
      desc: "Top-floor unit with 24/7 security, gated parking and easy access to town and transport.",
    },
  ];

  return (
    <section className="modules" id="featured">
      <h2>Featured Apartment - Bungoma's (AlphaOne)</h2>

      <div className="carousel">
        <button className="nav left" onClick={prevSlide}>
          <FaChevronLeft />
        </button>

        <motion.img
          key={index}
          src={images[index]}
          alt="Bungoma Apartment"
          className="carousel-img"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
        />

        <button className="nav right" onClick={nextSlide}>
          <FaChevronRight />
        </button>
      </div>

      <p style={{ textAlign: "center" }}>
        Modern, peaceful and fully serviced stay designed for comfort and
        convenience.
      </p>

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
