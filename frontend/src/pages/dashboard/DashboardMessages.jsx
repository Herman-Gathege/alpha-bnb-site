// frontend/src/pages/dashboard/DashboardMessages.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

const DashboardMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get("/dashboard/messages");
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const truncate = (text, length = 80) => {
    if (!text) return "";
    return text.length > length ? text.slice(0, length) + "…" : text;
  };

  return (
    <div>
      <h2 style={styles.pageTitle}>Contact Messages</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Message</th>
            <th style={styles.th}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" style={{ ...styles.td, textAlign: "center" }}>
                Loading...
              </td>
            </tr>
          ) : messages.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ ...styles.td, ...styles.noData }}>
                No messages yet.
              </td>
            </tr>
          ) : (
            messages.map((msg) => (
              <tr key={msg.id}>
                <td style={styles.td}>{msg.name}</td>
                <td style={styles.td}>{msg.email}</td>
                <td
                  style={{ ...styles.td, ...styles.messagePreview }}
                  onClick={() => setSelectedMessage(msg)}
                >
                  {truncate(msg.message)}
                </td>
                <td style={styles.td}>{new Date(msg.created_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedMessage && (
        <div style={styles.modalOverlay} onClick={() => setSelectedMessage(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Message from {selectedMessage.name}</h3>

            <p style={styles.modalMeta}>
              <strong>Email:</strong> {selectedMessage.email}
            </p>

            <p style={styles.modalMessage}>{selectedMessage.message}</p>

            <button
              style={styles.closeButton}
              onClick={() => setSelectedMessage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

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
  messagePreview: {
    cursor: "pointer",
    color: "#2563eb",
    maxWidth: "400px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },

  modal: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "600px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },

  modalTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
  },

  modalMeta: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "16px",
  },

  modalMessage: {
    fontSize: "15px",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
    marginBottom: "20px",
  },

  closeButton: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    cursor: "pointer",
  },

};

export default DashboardMessages;
