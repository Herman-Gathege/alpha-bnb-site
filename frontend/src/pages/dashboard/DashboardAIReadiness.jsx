// frontend/src/pages/dashboard/DashboardAIReadinessPage.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

const DashboardAIReadiness = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ averageScore: 0, totalCompanies: 0 });

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await api.get("/ai-readiness");
        setSubmissions(res.data);

        if (res.data.length > 0) {
          const totalScore = res.data.reduce((sum, s) => sum + s.score, 0);
          setSummary({
            averageScore: (totalScore / res.data.length).toFixed(2),
            totalCompanies: res.data.length,
          });
        }
      } catch (err) {
        console.error("Failed to fetch AI readiness:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  return (
    <div>
      <h2 style={styles.pageTitle}>AI Readiness Submissions</h2>

      {/* Summary Cards */}
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          {loading ? "Loading..." : `Average Score: ${summary.averageScore}`}
        </div>
        <div style={styles.card}>
          {loading ? "Loading..." : `Total Companies: ${summary.totalCompanies}`}
        </div>
      </div>

      {/* Answers Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Company Name</th>
              <th style={styles.th}>Score</th>
              <th style={styles.th}>Company Size</th>
              <th style={styles.th}>Answers Summary</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" style={{ ...styles.td, textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : submissions.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ ...styles.td, ...styles.noData }}>
                  No submissions yet.
                </td>
              </tr>
            ) : (
              submissions.map((s) => (
                <tr key={s.id}>
                  <td style={styles.td}>{s.company_name}</td>
                  <td style={styles.td}>{s.score}</td>
                  <td style={styles.td}>{s.company_size}</td>
                  <td style={styles.td}>{s.answers_summary}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
  tableContainer: { overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  },
  noData: { textAlign: "center", padding: "20px", fontStyle: "italic", color: "#6b7280" },
  th: { textAlign: "left", padding: "12px", backgroundColor: "#f8fafc", fontWeight: "600", fontSize: "14px" },
  td: { padding: "12px", borderTop: "1px solid #e5e7eb", fontSize: "14px" },
};

export default DashboardAIReadiness;
