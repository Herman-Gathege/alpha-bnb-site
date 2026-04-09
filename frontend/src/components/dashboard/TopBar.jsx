// frontend/src/components/dashboard/TopBar.jsx
import React from "react";
import { removeToken } from "../../auth/auth";
import { useNavigate } from "react-router-dom";

const TopBar = ({ title = "Dashboard" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <header style={styles.topbar}>
      <h1 style={styles.title}>{title}</h1>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
    </header>
  );
};

const styles = {
  topbar: {
    height: "60px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
  },
  logoutButton: {
    padding: "6px 12px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default TopBar;
