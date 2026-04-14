//frontend/src/pages/admin/Listings.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getListings,
  createListing,
  toggleListing,
} from "../../services/adminService";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location_city: "",
    location_area: "",
    price_per_night: 0,
    cleaning_fee: 0,
    service_fee: 0,
    max_guests: 1,
    bedrooms: 1,
    bathrooms: 1,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    load();
  }, []);

  const loadListings = async () => {
    try {
      const data = await getListings();
      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      alert(err.message);
    }
  };

  const load = async () => {
    try {
      const data = await getListings();
      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    try {
      await createListing(form);
      alert("Listing created!");
      loadListings();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleListing(id);
      loadListings();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateListing(id, data);
      loadListings();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Listings</h2>

      <div>
        <input
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="City"
          onChange={(e) => setForm({ ...form, location_city: e.target.value })}
        />
        <input
          placeholder="Area"
          onChange={(e) => setForm({ ...form, location_area: e.target.value })}
        />
        <input
          placeholder="Price"
          onChange={(e) =>
            setForm({ ...form, price_per_night: e.target.value })
          }
        />

        <input
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Cleaning Fee"
          onChange={(e) =>
            setForm({ ...form, cleaning_fee: Number(e.target.value) })
          }
        />

        <input
          placeholder="Service Fee"
          onChange={(e) =>
            setForm({ ...form, service_fee: Number(e.target.value) })
          }
        />

        <input
          placeholder="Max Guests"
          onChange={(e) =>
            setForm({ ...form, max_guests: Number(e.target.value) })
          }
        />

        <input
          placeholder="Bedrooms"
          onChange={(e) =>
            setForm({ ...form, bedrooms: Number(e.target.value) })
          }
        />

        <input
          placeholder="Bathrooms"
          onChange={(e) =>
            setForm({ ...form, bathrooms: Number(e.target.value) })
          }
        />

        <button onClick={handleCreate}>Create</button>
      </div>

      <hr />

      {listings.map((l) => (
        <div key={l.id}>
          <h4>{l.title}</h4>
          <p>{l.city}</p>
          <p>{l.price_per_night}</p>

          <button onClick={() => handleToggle(l.id)}>Toggle Active</button>
        </div>
      ))}
    </div>
  );
}
