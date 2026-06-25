import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [url, setUrl] = useState("");

  const [notifTitle, setNotifTitle] = useState("");
  const [notifDescription, setNotifDescription] = useState("");
  const [notifDeadline, setNotifDeadline] = useState("");

  useEffect(() => {
    loadServices();
    loadVisitors();
    loadNotifications();
  }, []);

  async function loadServices() {
    const { data } = await supabase.from("services").select("*").order("id");
    setServices(data || []);
  }

  async function saveService(e) {
    e.preventDefault();

    const { error } = await supabase.from("services").insert([
      { title, icon, url }
    ]);

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
    await supabase.from("services").delete().eq("id", id);
    loadServices();
  }

  async function loadVisitors() {
    const { data } = await supabase
      .from("contact_us")
      .select("*")
      .order("id", { ascending: false });

    setVisitors(data || []);
  }

  async function loadNotifications() {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .order("id", { ascending: false });

    setNotifications(data || []);
  }

  async function pushNotification(e) {
    e.preventDefault();

    const { error } = await supabase.from("notifications").insert([
      {
        title: notifTitle,
        description: notifDescription,
        deadline: notifDeadline,
        active: true,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setNotifTitle("");
    setNotifDescription("");
    setNotifDeadline("");
    loadNotifications();
  }

  async function toggleNotification(item) {
    await supabase
      .from("notifications")
      .update({ active: !item.active })
      .eq("id", item.id);

    loadNotifications();
  }

  async function deleteNotification(id) {
    await supabase.from("notifications").delete().eq("id", id);
    loadNotifications();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>CSC Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <section className="admin-section">
        <h2>Add New Service</h2>

        <form onSubmit={saveService}>
          <input type="text" placeholder="Service Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="text" placeholder="Icon" value={icon} onChange={(e) => setIcon(e.target.value)} />
          <input type="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} required />
          <button type="submit">Save Service</button>
        </form>

        <h3>Existing Services</h3>

        {services.map((service) => (
          <div key={service.id} className="admin-card">
            <span>{service.icon}</span>
            <strong>{service.title}</strong>
            <button onClick={() => deleteService(service.id)}>Delete</button>
          </div>
        ))}
      </section>

      <section className="admin-section">
        <h2>Push Announcement</h2>

        <form onSubmit={pushNotification}>
          <input type="text" placeholder="Announcement Title" value={notifTitle} onChange={(e) => setNotifTitle(e.target.value)} required />
          <textarea placeholder="Announcement Description" value={notifDescription} onChange={(e) => setNotifDescription(e.target.value)} required />
          <input type="date" value={notifDeadline} onChange={(e) => setNotifDeadline(e.target.value)} />
          <button type="submit">Push Announcement</button>
        </form>

        <h3>Announcements</h3>

        {notifications.map((item) => (
          <div key={item.id} className="admin-card">
            <div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <small>Last Date : {item.deadline}</small>
            </div>

            <button onClick={() => toggleNotification(item)}>
              {item.active ? "Hide" : "Show"}
            </button>

            <button onClick={() => deleteNotification(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </section>

      <section className="admin-section">
        <h2>Contact Requests</h2>

        {visitors.map((item) => (
          <div key={item.id} className="visitor-card">
            <h4>{item.name}</h4>
            <p>📞 {item.phone}</p>
            <p>📧 {item.email}</p>
            <p>🏡 {item.village}</p>
            <p>🛠 {item.service}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
