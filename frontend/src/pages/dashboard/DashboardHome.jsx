// frontend/src/pages/dashboard/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

const DashboardHome = () => {
  const [counts, setCounts] = useState({
    leads: 0,
    messages: 0,
    aiReadiness: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [leadsRes, messagesRes, aiRes] = await Promise.all([
          api.get("/leads/count"),
          api.get("/contact/count"),
          api.get("/ai-readiness/count"),
        ]);
        setCounts({
          leads: leadsRes.data.count,
          messages: messagesRes.data.count,
          aiReadiness: aiRes.data.count,
        });
      } catch (err) {
        console.error("Failed to fetch counts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div>
      <h2 style={styles.pageTitle}>Dashboard Home</h2>

      {/* Stats Cards */}
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          {loading ? "Loading..." : `Total Leads: ${counts.leads}`}
        </div>
        <div style={styles.card}>
          {loading ? "Loading..." : `Total Contact Messages: ${counts.messages}`}
        </div>
        <div style={styles.card}>
          {loading ? "Loading..." : `AI Readiness Submissions: ${counts.aiReadiness}`}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div style={styles.recentActivity}>
        <h3>Recent Activity</h3>
        <p>No activity yet.</p>
      </div>
    </div>
  );
};

const styles = {
  pageTitle: { fontSize: "22px", fontWeight: "600", marginBottom: "24px" },
  cardsContainer: { display: "flex", gap: "20px", marginBottom: "30px" },
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    fontWeight: "500",
  },
  recentActivity: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
};

export default DashboardHome;
