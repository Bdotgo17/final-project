import githubLogo from "../../assets/gitHubLogo.svg";
import linkedinLogo from "../../assets/linkedin.svg";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__left">
        <div className="footer__copyright">
          ©2025 Supersite, Powered by News API
        </div>
      </div>
      <div className="footer__right">
        <div className="footer__links">
          <a href="/" className="footer__link">
            Home
          </a>
          <a
            href="https://tripleten.com"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            TripleTen
          </a>
        </div>
        <div className="footer__icons">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubLogo} alt="GitHub" className="footer__icon" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinLogo} alt="LinkedIn" className="footer__icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
