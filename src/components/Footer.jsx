import logo from "../assets/csc_logo.png";

function Footer() {
  return (
    <footer className="footer">
      <img
        src={logo}
        alt="CSC Logo"
        className="footer-logo"
      />

      <h5 className="footer-text" style={{ color: "white", textAlign: "center" }}>
        © 2026 CSC Center Narsinghpur Garhi | All Rights Reserved
      </h5>
    </footer>
  );
}

export default Footer;