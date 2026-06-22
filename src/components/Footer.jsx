import "./Footer.css";
import logo from "../assets/csc_logo.png";

function Footer() {
  return (
    <footer className="footer">
      <img src={logo} alt="CSC Logo" className="footer-logo" />

      <div>
        © Copyright CSC Center Narsinghpur Garhi 2026
      </div>
    </footer>
  );
}

export default Footer;