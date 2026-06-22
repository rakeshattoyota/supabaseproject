import React from "react";

export default function HelpModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="help-modal-overlay" onClick={onClose}>
      <div className="help-modal" onClick={(e) => e.stopPropagation()}>
        <button className="help-modal-close" onClick={onClose} aria-label="Close">×</button>
        <h2>CSC Owner Details</h2>
        <div className="help-modal-body">
          <p><strong>Owner:</strong> Pawan Vashistha</p>
          <p><strong>Phone:</strong> +91-8397951911</p>
          <p><strong>Email:</strong> csc.garhi2@gmail.com</p>
          <p><strong>Address:</strong> Near Sarpanch House, Main Tankri Road, Narsinghpur Garhi, Rewari, Haryana</p>
          <p><strong>Timings:</strong> As per Appointment</p>
          <p>
            For help with services, call or visit during working hours. You can also
            leave a message from the Contact form on this page.
          </p>
          <button
            onClick={() =>
              window.open("https://maps.google.com/?q=3GR4+G2F", "_blank")
            }
          >
            View on Google Maps
          </button>
        </div>
      </div>
    </div>
  );
}
