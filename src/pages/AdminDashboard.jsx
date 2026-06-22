import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    const { data, error } = await supabase.from("services").select("*").order("id", { ascending: true });
    if (error) {
      console.error(error);
      return;
    }
    setServices(data || []);
  }

  async function saveService(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("services").insert([
      {
        title,
        icon,
        url,
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setIcon("");
    setUrl("");
    loadServices();
  }

  async function deleteService(id) {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    loadServices();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <div className="page-shell admin-shell">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="button-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <section className="admin-section">
        <h3>Add New Service</h3>
        <form className="admin-form" onSubmit={saveService}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Icon (emoji or text)"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
          <input
            type="url"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Service"}
          </button>
        </form>
      </section>

      <section className="admin-section">
        <h3>Existing Services</h3>
        <div className="admin-list">
          {services.length === 0 ? (
            <p>No services defined yet.</p>
          ) : (
            services.map((service) => (
              <div key={service.id} className="admin-card">
                <strong>{service.icon || "🔧"}</strong>
                <div>
                  <h4>{service.title}</h4>
                  <p>{service.url}</p>
                </div>
                <button
                  className="button-danger"
                  onClick={() => deleteService(service.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
