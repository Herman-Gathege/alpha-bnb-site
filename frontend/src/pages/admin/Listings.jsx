import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getListings,
  createListing,
  toggleListing,
  updateListing,
} from "../../services/adminService";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location_city: "",
    location_area: "",
    price_per_night: "",
    cleaning_fee: "",
    service_fee: "",
    max_guests: "",
    bedrooms: "",
    bathrooms: "",
  });

  // 🔐 Auth check + load listings ONCE
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/admin/login");
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      const data = await getListings();
      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔥 Convert numbers before sending to API
  const handleCreate = async () => {
    try {
      const payload = {
        ...form,
        price_per_night: Number(form.price_per_night),
        cleaning_fee: Number(form.cleaning_fee),
        service_fee: Number(form.service_fee),
        max_guests: Number(form.max_guests),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
      };

      await createListing(payload);
      alert("Listing created!");
      loadListings();
    } catch (err) {
      alert(err.message);
    }
  };

  const startEdit = (listing) => {
    setEditingId(listing.id);
    setEditForm({
      title: listing.title,
      description: listing.description,
      location_city: listing.location_city,
      location_area: listing.location_area,
      price_per_night: listing.price_per_night,
      cleaning_fee: listing.cleaning_fee,
      service_fee: listing.service_fee,
      max_guests: listing.max_guests,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
    });
  };

  const saveEdit = async (id) => {
    try {
      await updateListing(id, {
        ...editForm,
        price_per_night: Number(editForm.price_per_night),
        cleaning_fee: Number(editForm.cleaning_fee),
        service_fee: Number(editForm.service_fee),
        max_guests: Number(editForm.max_guests),
        bedrooms: Number(editForm.bedrooms),
        bathrooms: Number(editForm.bathrooms),
      });

      setEditingId(null);
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

  return (
    <div className="admin-page">
      <h2>Create Listing</h2>

      {/* 🧾 FORM GRID */}
      <div className="listing-form">
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
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder="Price per night"
          onChange={(e) =>
            setForm({ ...form, price_per_night: e.target.value })
          }
        />
        <input
          placeholder="Cleaning fee"
          onChange={(e) => setForm({ ...form, cleaning_fee: e.target.value })}
        />
        <input
          placeholder="Service fee"
          onChange={(e) => setForm({ ...form, service_fee: e.target.value })}
        />
        <input
          placeholder="Guests (max)"
          onChange={(e) => setForm({ ...form, max_guests: e.target.value })}
        />
        <input
          placeholder="Bedrooms"
          onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
        />
        <input
          placeholder="Bathrooms"
          onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
        />

        <button className="primary-btn" onClick={handleCreate}>
          Create Listing
        </button>
      </div>

      <hr />

      <h2>All Listings</h2>

      <div className="listings-grid">
        {listings.map((l) => (
          <div
            key={l.id}
            className={`listing-card ${editingId === l.id ? "editing" : ""}`}
          >
            <div className="listing-card-header">
              <h3>{l.title}</h3>
              <span className={`status ${l.is_active ? "active" : "inactive"}`}>
                {l.is_active ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="listing-card-body">
              <p>
                <strong>Location:</strong> {l.location_city}, {l.location_area}
              </p>
              <p>
                <strong>Description:</strong> {l.description}
              </p>

              <div className="price-stack">
                <p>
                  (Per) Night: <strong>KES {l.price_per_night}</strong>
                </p>
                <p>Cleaning: KES {l.cleaning_fee}</p>
                <p>Service: KES {l.service_fee}</p>
              </div>

              <div className="listing-meta">
                <span className="meta-list">(Max) Guests : {l.max_guests}</span>
                <span className="meta-list">Bedrooms: {l.bedrooms}</span>
                <span className="meta-list">Bathrooms: {l.bathrooms}</span>
              </div>

              <div className="listing-admin-stats">
                <span className="meta-list"> Images: {l.total_images}</span>
                <span className="meta-list"> Bookings: {l.total_bookings}</span>
                <span className="meta-list">
                  {" "}
                  Blocked Days: {l.blocked_days}
                </span>
              </div>

              <small className="created-date">Created: {l.created_at}</small>

              {editingId === l.id ? (
                <div className="edit-grid full-edit-form">
                  <h4>Edit Listing</h4>

                  <input
                    value={editForm.title || ""}
                    placeholder="Title"
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                  />

                  <input
                    value={editForm.description || ""}
                    placeholder="Description"
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                  />

                  <input
                    value={editForm.location_city || ""}
                    placeholder="City"
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        location_city: e.target.value,
                      })
                    }
                  />

                  <input
                    value={editForm.location_area || ""}
                    placeholder="Area"
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        location_area: e.target.value,
                      })
                    }
                  />

                  <input
                    value={editForm.price_per_night || ""}
                    placeholder="Price per night"
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        price_per_night: e.target.value,
                      })
                    }
                  />

                  <input
                    value={editForm.cleaning_fee || ""}
                    placeholder="Cleaning fee"
                    onChange={(e) =>
                      setEditForm({ ...editForm, cleaning_fee: e.target.value })
                    }
                  />

                  <input
                    value={editForm.service_fee || ""}
                    placeholder="Service fee"
                    onChange={(e) =>
                      setEditForm({ ...editForm, service_fee: e.target.value })
                    }
                  />

                  <input
                    value={editForm.max_guests || ""}
                    placeholder="Guests"
                    onChange={(e) =>
                      setEditForm({ ...editForm, max_guests: e.target.value })
                    }
                  />

                  <input
                    value={editForm.bedrooms || ""}
                    placeholder="Bedrooms"
                    onChange={(e) =>
                      setEditForm({ ...editForm, bedrooms: e.target.value })
                    }
                  />

                  <input
                    value={editForm.bathrooms || ""}
                    placeholder="Bathrooms"
                    onChange={(e) =>
                      setEditForm({ ...editForm, bathrooms: e.target.value })
                    }
                  />

                  <div className="edit-actions">
                    <button onClick={() => saveEdit(l.id)}>Save Changes</button>
                    <button style={{background: "red"}} onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="listing-card-actions">
              <button onClick={() => handleToggle(l.id)}>
                {l.is_active ? "Deactivate" : "Activate"}
              </button>

              <button
                style={{ marginLeft: "20px", background: "red" }}
                onClick={() => startEdit(l)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
