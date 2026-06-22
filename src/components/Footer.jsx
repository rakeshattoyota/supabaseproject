import logo from "../assets/csc_logo.png";

function Footer() {
  return (
    <footer className="footer">
      <img src={logo} alt="CSC Logo" className="footer-logo" />
      <p>
        © 2026 CSC Center Narsinghpur Garhi | All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;