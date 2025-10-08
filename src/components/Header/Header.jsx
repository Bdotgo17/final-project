import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import hamburgerIcon from "../../assets/hamburger.svg";
import hamburgerBlackIcon from "../../assets/hamburgerBlack.svg";
import mobileCloseIcon from "../../assets/mobileClose.svg";

function Header({ showSavedLink, onSignInClick, user, onSignIn, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isDark = location.pathname === "/saved-news";
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const isSavedNews = location.pathname === "/saved-news";
  const hamburgerIconSrc = isSavedNews ? hamburgerBlackIcon : hamburgerIcon;

  const handleSignIn = () => {
    // ...your login logic...
    setShowSignInModal(false); // close modal

    // Only redirect on mobile (≤320px)
    if (window.innerWidth <= 320) {
      navigate("/saved-news");
    }
  };

  return (
    <>
      <header className={`header${isDark ? " header-dark" : ""}`}>
        <div className="header-content">
          <span className="header-title">NewsExplorer</span>
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <img
              src={menuOpen ? mobileCloseIcon : hamburgerIconSrc}
              alt={menuOpen ? "Close menu" : "Open menu"}
              className="hamburger-icon"
              width={24}
              height={24}
            />
          </button>
          <Navigation
            showSavedLink={showSavedLink}
            onSignIn={() => {
              console.log("Sign in clicked");
              setShowSignInModal(true);
            }}
            user={user}
            isDark={isDark}
            onLogout={onLogout}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        </div>
      </header>
      {showSignInModal && (
        <div className="sign-in-modal">
          <input type="text" placeholder="Username" autoFocus />
          <button onClick={handleSignIn}>Sign In</button>
          {/* ...other fields/buttons... */}
        </div>
      )}
    </>
  );
}

export default Header;
