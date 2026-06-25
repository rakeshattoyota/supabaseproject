
import logo from "../assets/csc_logo.png";
import narsinghImg from "./narsingh_img.jpg";
import milan from "./milan.jpg";

function Header() {
  return (
    <>
      <div className="top-bar">
        <span>📞 Contact CSC Center - 8397951911</span>
        <span>📍 Narsinghpur Garhi, Rewari, Haryana</span>
        <span>🕘 Mon-Sat 9 AM - 6 PM</span>
      </div>

      <header className="header">
        <img src={logo} alt="CSC Logo" />
        <img src={milan} alt="milan photo" />
        <div className="header-center">
          <h1>CSC Center Narsinghpur Garhi</h1>
        <h6>
  <a href="https://www.youtube.com/results?search_query=%40mukulvashistha101" target="_blank">
    Follow YouTube Channel
  </a>
</h6>
     
        
       
        </div>
        <img src={narsinghImg} alt="Narsingh" />
      </header>
    </>
  );
}

export default Header;
