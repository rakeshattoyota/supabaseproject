import React, { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import HelpModal from "./components/HelpModal";
import serviceCards from "./components/card";

function App() {
  const scrollToSection = (sectionId) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <Header />

      <nav className="app-navbar">
        <button onClick={() => scrollToSection("home")}>Home</button>
        <button onClick={() => scrollToSection("services")}>Services</button>
        <button onClick={() => scrollToSection("about")}>About Us</button>
        <button onClick={() => scrollToSection("location")}>Location</button>
        <button onClick={() => scrollToSection("contact")}>Contact</button>
        <button onClick={() => setShowHelp(true)}>Help</button>
      </nav>

      <section id="home" className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">CSC Center Narsinghpur Garhi</span>
          <h1>सब सरकारी सेवाएं अब पास ही में</h1>
          <p>
            आधार, पैन, वोटर, राशन, आयुष्मान, ई-श्रम और डिजिटल सेवाएं
            आपके नज़दीकी CSC सेंटर पर उपलब्ध हैं।
          </p>

          <div className="hero-actions">
            <button onClick={() => scrollToSection("contact")}>Contact Now</button>
            <button onClick={() => scrollToSection("services")}>View Services</button>
          </div>
        </div>
      </section>

      <section id="services" className="section service-section">
        <h2 className="section-title">हमारी सेवाएं</h2>
        <p className="section-description">
          भरोसेमंद सरकारी और डिजिटल सेवाएं, सीधे आपके नजदीकी CSC सेंटर से।
        </p>

        <div className="service-grid">
          {serviceCards.map((item, index) => (
            <button
              key={index}
              className="service-card"
              onClick={() => window.open(item.url, "_blank")}
            >
              <div className="service-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </button>
          ))}
        </div>
        <hr />
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
      <hr />

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

      <HelpModal open={showHelp} onClose={() => setShowHelp(false)} />
            <hr />
      <Footer />
    </>
  );
}

export default App;
