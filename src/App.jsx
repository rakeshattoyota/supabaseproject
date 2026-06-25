import React, { useState } from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HelpModal from "./components/HelpModal";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="app-container">

      {/* Header */}
      <Header />

      {/* Navigation */}
      <nav className="app-navbar">
        <Link to="/">Home</Link>

        <a href="#services">
          Services
        </a>

        <a href="#about">
          About Village
        </a>

        <a href="#location">
          Location
        </a>

        <a href="#contact">
          Contact
        </a>

        <Link to="/login">
          Admin Login
        </Link>

        <button
          type="button"
          className="help-btn"
          onClick={() => setShowHelp(true)}
        >
          Help
        </button>
      </nav>

      {/* Pages */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Home />}
          />
        </Routes>
      </main>

      {/* Help Popup */}
      <HelpModal
        open={showHelp}
        onClose={() => setShowHelp(false)}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;