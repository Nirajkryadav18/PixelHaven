import { FiGithub, FiTwitter, FiInstagram } from "react-icons/fi";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          &copy; {new Date().getFullYear()} PixelHaven. Photos provided by{" "}
          <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className="footer-link">
            Pexels
          </a>
          .
        </p>

        <div className="footer-icons">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="Github"><FiGithub /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FiTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
