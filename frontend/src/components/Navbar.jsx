import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import "../css/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const goToSection = (id) => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      { threshold: 0.6 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const navLinkClass = (id) =>
    `nav-links ${activeSection === id ? "active" : ""}`;

  const isActiveRoute = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img
            src="/images/logo.jpeg"
            alt="MySpaceByAlphaOne"
            className="navbar-logo-img"
            onClick={() => goToSection("home")}
          />
          <span className="navbar-logo-text">MySpaceByAlphaOne</span>
        </Link>

        <div
          className="menu-icon"
          style={{ marginTop: "20px" }}
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

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
            <button
              className={navLinkClass("featured")}
              onClick={() => goToSection("featured")}
            >
              Featured BnB
            </button>
          </li>

          <li className="nav-item">
            <button
              className={navLinkClass("reviews")}
              onClick={() => goToSection("reviews")}
            >
              Reviews
            </button>
          </li>

          <li className="nav-item">
            <button
              className={navLinkClass("about")}
              onClick={() => goToSection("about")}
            >
              Meet the Host
            </button>
          </li>

          <li className="nav-item">
            <Link
              to="/listings"
              className={`nav-links ${isActiveRoute("/listings") ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
              style={{ textDecoration: "none" }}
            >
              Listings
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/contact"
              className={`nav-links ${isActiveRoute("/contact") ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
              style={{ textDecoration: "none" }}
            >
              Contact
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/ai-readiness"
              className="nav-links nav-cta"
              onClick={() => setIsOpen(false)}
              style={{ textDecoration: "none" }}
            >
              Book a stay Today
            </Link>
          </li>
        </ul>

        {/* AUTH AREA */}
        <div className="nav-auth">
          {user ? (
            <div className="avatar-wrapper">
              <div
                className="avatar"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user.name ? (
                  user.name.charAt(0).toUpperCase()
                ) : (
                  <FaUserCircle />
                )}
              </div>

              {showDropdown && (
                <div className="avatar-dropdown">
                  <p className="avatar-name">{user.name}</p>

                  {user.role === "admin" ? (
                    <Link to="/admin" onClick={() => setShowDropdown(false)}>
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      onClick={() => setShowDropdown(false)}
                    >
                      Dashboard
                    </Link>
                  )}

                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
