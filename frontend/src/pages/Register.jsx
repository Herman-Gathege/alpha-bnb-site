//frontend/src/pages/Register.jsx
import React, { useState } from "react";
import api from "../api/axiosConfig";
import { setToken, isAuthenticated } from "../auth/auth";
import { useNavigate, Navigate, useLocation } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || "/dashboard";

  if (isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1️⃣ Create account
      await api.post("/auth/register", { name, email, password });

      // 2️⃣ Immediately login
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.access_token);

      // 3️⃣ Return to previous page (listing booking)
      navigate(redirectTo);
    } catch (err) {
      setError("Unable to register. Try another email.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.brand}>MySpace by AlphaOne</h1>
        <h2 style={styles.title}>Create your account</h2>
        <p style={styles.subtitle}>Start booking amazing stays</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Full name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>

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
            Create Account
          </button>
        </form>

        <p style={styles.register}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate(`/login?redirect=${redirectTo}`)}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  register: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
  },
  link: {
    color: "#B10F3A",
    cursor: "pointer",
  },
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#f8fafc,#eef2ff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    borderRadius: "14px",
    padding: "32px",
    boxShadow: "0 20px 40px rgba(0,0,0,.08)",
  },
  brand: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#B10F3A",
    textAlign: "center",
    marginBottom: "8px",
  },
  title: { fontSize: "22px", fontWeight: "600", textAlign: "center" },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    textAlign: "center",
    marginBottom: "24px",
  },
  error: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "16px",
    textAlign: "center",
  },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "13px", fontWeight: "500" },
  input: { padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" },
  button: {
    marginTop: "8px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#B10F3A",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
  login: { marginTop: "20px", textAlign: "center" },
};

export default Register;
