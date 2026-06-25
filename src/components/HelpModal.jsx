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
              window.open("https://www.google.com/maps/place/CSC+Center+Narsinghpur+Garhi/@28.0913946,76.5004967,17z/data=!4m10!1m2!2m1!1scsc+center+narsinghpur+garhi!3m6!1s0x390d550021305b3b:0xd59aae889f626b2d!8m2!3d28.0913946!4d76.5050028!15sChxjc2MgY2VudGVyIG5hcnNpbmdocHVyIGdhcmhpkgENaW50ZXJuZXRfY2FmZeABAA!16s%2Fg%2F11nqj7rfdr?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D", "_blank")
            }
          >
            View on Google Maps
          </button>
        </div>
      </div>
    </div>
  );
}
