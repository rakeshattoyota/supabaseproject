import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import ContactForm from "../components/ContactForm";
import serviceCards from "../components/card";


export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    loadServices();
    loadAnnouncements();
  }, []);

  async function loadServices() {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      setError(error.message);
    } else {
      setServices(data || []);
      setError(null);
    }
    setLoading(false);
  }
  async function loadAnnouncements() {
    // Same table the admin pushes to (AdminDashboard → "Push Announcement")
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setAnnouncements(data || []);
    }
  }

  const hasDynamicServices = services.length > 0;
  const displayedServices = hasDynamicServices ? services : serviceCards;

  return (
    <>
      <section id="home" className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">CSC Center Narsinghpur Garhi</span>
          <h1>सब सरकारी सेवाएं अब पास ही में</h1>
          <p>
            आधार, पैन, वोटर, राशन, आयुष्मान, ई-श्रम और डिजिटल सेवाएं
            आपके नज़दीकी CSC सेंटर पर उपलब्ध हैं।
          </p>

          <div className="hero-actions">
            <a href="#contact" className="hero-button">
              Contact Now
            </a>
            <a href="#services" className="hero-button hero-button-secondary">
              View Services
            </a>
          </div>
        </div>
      </section>

     <section id="announcement" className="section announcement-section">
  <h2 className="section-title">Latest Announcements</h2>

  {announcements.length === 0 ? (
    <div className="announcement-card">
      <h3>No Active Announcements</h3>
      <p>Latest updates will appear here.</p>
    </div>
  ) : (
    announcements.map((item) => (
      <div className="announcement-card" key={item.id}>
        <div className="announcement-top">
          <span className="announcement-tag">Notice</span>

          <span className="announcement-deadline">
            {item.deadline ? `Last Date: ${item.deadline}` : ""}
          </span>
        </div>

        <h2>{item.title}</h2>

        <p>{item.description}</p>

        <a href="#contact" className="announcement-button">
          Apply Now
        </a>
      </div>
    ))
  )}
</section>

      <section id="services" className="section service-section">
        <h2 className="section-title">हमारी सेवाएं</h2>
        <p className="section-description">
          भरोसेमंद सरकारी और डिजिटल सेवाएं, सीधे आपके नजदीकी CSC सेंटर से।
        </p>

        {error ? <p className="service-error">Unable to load services: {error}</p> : null}
        {loading ? (
          <p className="service-loading">Loading services...</p>
        ) : null}

        <div className="service-grid">
          {displayedServices.map((item, index) => (
            <button
              key={item.id || index}
              className="service-card"
              onClick={() => window.open(item.url, "_blank")}
            >
              <div className="service-icon">{item.icon || "🔧"}</div>
              <h3>{item.title}</h3>
              {item.description ? <p>{item.description}</p> : null}
            </button>
          ))}
        </div>
      </section>

      <section id="about" className="section about-section">
        <h2 className="section-title">About CSC Center</h2>
        <p className="section-description">
          CSC Center Narsinghpur Garhi is a trusted Common Service Center located in Rewari, Haryana. We provide Aadhaar, PAN, Ayushman, Labour Card, PF, ESIC, PM Kisan, Lado Lakshmi and many other citizen services.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Fast Support</h3>
            <p>Experienced staff to help you complete forms and upload documents.</p>
          </div>
          <div className="feature-card">
            <h3>Local Accessibility</h3>
            <p>Service center is available for residents of Rewari and nearby villages.</p>
          </div>
          <div className="feature-card">
            <h3>Trusted Services</h3>
            <p>Official documents and government schemes processed with care.</p>
          </div>
        </div>
      </section>

      <section id="location" className="section location-section">
        <h2 className="section-title">Location</h2>
        <p className="section-description">
          Visit our center at Narsinghpur Garhi, Rewari, Haryana. Google Map Code: 3GR4+G2F.
        </p>

        <div className="location-card">
          <p>
            📍 <strong>Location Code</strong>: 3GR4+G2F
          </p>
          <p>
            On Tankri Road, Near Sarpanch House, easy access for local residents.
          </p>
          <button
            onClick={() =>
              window.open("https://www.google.com/maps/place/CSC+Center+Narsinghpur+Garhi/@28.0913946,76.5004967,17z/data=!4m10!1m2!2m1!1scsc+center+narsinghpur+garhi!3m6!1s0x390d550021305b3b:0xd59aae889f626b2d!8m2!3d28.0913946!4d76.5050028!15sChxjc2MgY2VudGVyIG5hcnNpbmdocHVyIGdhcmhpkgENaW50ZXJuZXRfY2FmZeABAA!16s%2Fg%2F11nqj7rfdr?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D", "_blank")
            }
          >
            Open in Google Maps
          </button>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <ContactForm />
      </section>
    </>
  );
}
