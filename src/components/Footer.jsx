import logo from "../assets/csc_logo.png";

function Footer() {
  return (
    <footer className="footer">
      <img
        src={logo}
        alt="CSC Logo"
        className="footer-logo"
      />

      <h6 className="footer-text">
        © 2026 CSC Center Narsinghpur Garhi | All Rights Reserved
      </h6>
    </footer>
  );
}

export default Footer;