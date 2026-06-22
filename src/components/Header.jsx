import "./Header.css";
import logo from "../assets/csc_logo.png";
import narsinghImg from "../assets/narsingh_img.jpg";

function Header() {
  return (
    <div className="box">
      <img src={logo} alt="CSC Logo" />
      <h1>CSC Center Narsinghpur Garhi</h1>
      <img src={narsinghImg} alt="Narsingh" />
    </div>
  );
}

export default Header;