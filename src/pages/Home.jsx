import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import ContactForm from "../components/ContactForm";
import serviceCards from "../components/card";

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadServices();
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
          CSC Center Narsinghpur Garhi is your local service partner for government
          ID cards, certificates and online enrollment support.
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
          Visit us at the CSC Center in Narsinghpur Garhi, Rewari, Haryana.
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
              window.open("https://maps.google.com/?q=3GR4+G2F", "_blank")
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
