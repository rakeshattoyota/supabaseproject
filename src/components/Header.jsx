import logo from "../assets/csc_logo.png";
import narsinghImg from "./narsingh_img.jpg";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="CSC Logo" />

      <div className="header-center">
        <h1>CSC Center Narsinghpur Garhi</h1>
      </div>

      <img src={narsinghImg} alt="Narsingh Bhagwan" />
    </header>
  );
}

export default Header;