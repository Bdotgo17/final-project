import githubLogo from "../../assets/gitHubLogo.svg";
import linkedinLogo from "../../assets/linkedin.svg";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
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
      </div>
      <div className="footer-copyright">
        ©2025 Supersite, Powered by News API
      </div>
    </footer>
    // <footer className="footer">
    //   <div className="footer-left">©2025 Supersite, Powered by News API</div>
    //   <div className="footer-right">
    //     <a href="/" className="footer-link">
    //       Home
    //     </a>
    //     <span className="footer-link">TripleTen</span>
    //     <img src={githubLogo} alt="GitHub" className="footer-icon" />
    //     <img src={linkedinLogo} alt="LinkedIn" className="footer-icon" />
    //   </div>
    // </footer>
  );
}

export default Footer;
