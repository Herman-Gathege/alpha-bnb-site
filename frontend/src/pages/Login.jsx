import React, { useState } from "react";
import api from "../api/axiosConfig";
import { setToken, isAuthenticated } from "../auth/auth";
import { useNavigate, Navigate, useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Get redirect destination
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || "/dashboard";

  // If already logged in → go to destination
  if (isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      // Save JWT
      setToken(res.data.access_token);

      // ✅ Save user (needed for role-based routing + PrivateRoute)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 👑 Role-based redirect (override redirectTo if login is direct)
      const role = res.data.user?.role;

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate(redirectTo || "/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.brand}>MySpace by AlphaOne</h1>
        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Login to continue your booking</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        {/* 👉 We will build this page next */}
        <p style={styles.register}>
          Don’t have an account?{" "}
          <span style={styles.link} onClick={() => navigate(`/register?redirect=${redirectTo}`)}>
            
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  link: {
    color: "#B10F3A",
    cursor: "pointer",
  },
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    padding: "32px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  },
  brand: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#B10F3A",
    marginBottom: "8px",
    textAlign: "center",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "4px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    textAlign: "center",
    marginBottom: "24px",
  },
  error: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "10px 12px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "16px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#374151",
  },
  input: {
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  },
  button: {
    marginTop: "8px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#B10F3A",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  register: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
  },
};

export default Login;
