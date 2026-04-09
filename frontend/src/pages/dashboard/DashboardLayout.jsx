// frontend/src/pages/dashboard/DashboardLayout.jsx

import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import TopBar from "../../components/dashboard/TopBar";

const DashboardLayout = () => {
  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <Link to="/" style={{ textDecoration: "none" , color: "inherit" }}>
          <h2 style={styles.logo}>SureStep</h2>
        </Link>

        <nav style={styles.nav}>
          <NavLink
            to="/dashboard"
            end
            style={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/leads"
            style={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Leads
          </NavLink>

          <NavLink
            to="/dashboard/ai-readiness"
            style={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            AI Readiness
          </NavLink>

          <NavLink
            to="/dashboard/contacts"
            style={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Contact Messages
          </NavLink>
        </nav>
      </aside>

      {/* Main Area */}
      <div style={styles.main}>
        {/* Top Bar */}
        <TopBar title="Dashboard" />

        {/* Page Content */}
        <main style={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    fontFamily: "sans-serif",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#0f172a",
    color: "#fff",
    padding: "20px",
  },
  logo: {
    marginBottom: "30px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  link: {
    color: "#e5e7eb",
    textDecoration: "none",
    fontSize: "14px",
    padding: "8px 10px",
    borderRadius: "6px",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f8fafc",
  },
  content: {
    flex: 1,
    padding: "24px",
    overflowY: "auto",
    backgroundColor: "#f1f5f9",
  },
  activeLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    backgroundColor: "#1e293b",
    padding: "8px 10px",
    borderRadius: "6px",
  },
};

export default DashboardLayout;
