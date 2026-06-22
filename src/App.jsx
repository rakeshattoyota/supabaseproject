import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import card_services from "./components/card";

function App() {
  return (
    <div>
      <Header />

      <h1 className="main-title">CSC Center Narsinghpur Garhi</h1>

      <div className="service-grid">
        {card_services.map((item, index) => (
          <div
            key={index}
            className="service-card"
            onClick={() => window.open(item.url, "_blank")}
          >
            <h2>{item.icon}</h2>
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

      <ContactForm />

      <Footer />
    </div>
  );
}

export default App;