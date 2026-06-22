import React, { useState } from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HelpModal from "./components/HelpModal";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <Header />

      <nav className="app-navbar">
        <Link to="/">Home</Link>
        <a href="/#services">Services</a>
        <a href="/#about">About Us</a>
        <a href="/#location">Location</a>
        <a href="/#contact">Contact</a>
        <Link to="/login">Admin</Link>
        <button type="button" onClick={() => setShowHelp(true)}>
          Help
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>

      <HelpModal open={showHelp} onClose={() => setShowHelp(false)} />
      <Footer />
    </>
  );
}

export default App;
