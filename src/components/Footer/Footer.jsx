import githubLogo from "../../assets/gitHubLogo.svg";
import linkedinLogo from "../../assets/linkedin.svg";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">©2025 Supersite, Powered by News API</div>
      <div className="footer-right">
        <a href="/" className="footer-link">
          Home
        </a>
        <span className="footer-link">TripleTen</span>
        <img src={githubLogo} alt="GitHub" className="footer-icon" />
        <img src={linkedinLogo} alt="LinkedIn" className="footer-icon" />
      </div>
    </footer>
  );
}

export default Footer;