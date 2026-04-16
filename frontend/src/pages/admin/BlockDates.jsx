//frontend/src/pages/admin/BlockDates.jsx
import { useState } from "react";
import { blockDates } from "../../services/adminService";

export default function BlockDates() {
  const [form, setForm] = useState({
    listing_id: "",
    start_date: "",
    end_date: ""
  });

  const handleSubmit = async () => {
    await blockDates(form);
    alert("Blocked successfully");
  };

  return (
    <div>
      <h2>Block Dates</h2>

      <input
        placeholder="Listing ID"
        onChange={(e) => setForm({ ...form, listing_id: e.target.value })}
      />

      <input
        type="date"
        onChange={(e) => setForm({ ...form, start_date: e.target.value })}
      />

      <input
        type="date"
        onChange={(e) => setForm({ ...form, end_date: e.target.value })}
      />

      <button onClick={handleSubmit}>Block</button>
    </div>
  );
}