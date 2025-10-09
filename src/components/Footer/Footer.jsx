import githubLogo from "../../assets/gitHubLogo.svg";
import linkedinLogo from "../../assets/linkedin.svg";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-right">
        <div className="footer-links">
          <a href="/" className="footer-link">
            Home
          </a>
          <a
            href="https://tripleten.com"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            TripleTen
          </a>
        </div>
        <div className="footer-icons">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubLogo} alt="GitHub" className="footer-icon" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinLogo} alt="LinkedIn" className="footer-icon" />
          </a>
        </div>
        <div className="footer-copyright">
          ©2025 Supersite, Powered by News API
        </div>
      </div>
    </footer>
  );
}

export default Footer;
