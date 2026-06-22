import logo from "../assets/csc_logo.png";
import narsinghImg from "./narsingh_img.jpg";

function Header() {
  return (
    <div className="box">
      <img src={logo} alt="CSC Logo" />
      <h1>CSC Center Narsinghpur Garhi</h1>
      <img src={narsinghImg} alt="Narsinghpur Garhi" />
    </div>
  );
}

export default Header;