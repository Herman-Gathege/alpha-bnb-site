import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../css/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // 🔹 Scroll / navigate to section safely
  const goToSection = (id) => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 🔹 Highlight sections on landing page
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  const navLinkClass = (id) =>
    `nav-links ${activeSection === id ? "active" : ""}`;

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img
            src="/images/surestep-logo.jpg"
            alt="SureStep Business Advisors"
            className="navbar-logo-img"
          />
          <span className="navbar-logo-text">SureStep Business Advisors</span>
        </Link>

        {/* Mobile menu */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Nav links */}
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <button
              className={navLinkClass("home")}
              onClick={() => goToSection("home")}
            >
              Home
            </button>
          </li>

          <li className="nav-item">
            <Link
              to="/services"
              className={`nav-links ${
                isActiveRoute("/services") ? "active" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
          </li>

          <li className="nav-item">
            <button
              className={navLinkClass("about")}
              onClick={() => goToSection("about")}
            >
              About
            </button>
          </li>

          <li className="nav-item">
            <Link
              to="/events"
              className={`nav-links ${
                isActiveRoute("/events") ? "active" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/contact"
              className={`nav-links ${
                isActiveRoute("/contact") ? "active" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/ai-readiness"
              className="nav-links nav-cta"
              onClick={() => setIsOpen(false)}
            >
              Free AI Readiness Score
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
