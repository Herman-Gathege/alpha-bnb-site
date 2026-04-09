// frontend/src/pages/dashboard/DashboardLeads.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

const DashboardLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await api.get("/leads");
        setLeads(res.data);
      } catch (err) {
        console.error("Failed to fetch leads:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  return (
    <div>
      <h2 style={styles.pageTitle}>Leads</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Created</th>
            <th style={styles.th}>Source</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" style={{ ...styles.td, textAlign: "center" }}>
                Loading...
              </td>
            </tr>
          ) : leads.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ ...styles.td, ...styles.noData }}>
                No leads yet.
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead.id}>
                <td style={styles.td}>{new Date(lead.created_at).toLocaleString()}</td>
                <td style={styles.td}>{lead.source}</td>
                <td style={styles.td}>{lead.name}</td>
                <td style={styles.td}>{lead.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  pageTitle: { fontSize: "22px", fontWeight: "600", marginBottom: "24px" },
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

export default DashboardLeads;
