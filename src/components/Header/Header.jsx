import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import hamburgerIcon from "../../assets/hamburger.svg";
import hamburgerBlackIcon from "../../assets/hamburgerBlack.svg";
import mobileCloseIcon from "../../assets/mobileClose.svg";

function Header({ showSavedLink, user, onSignIn, onLogout }) {
  const location = useLocation();
  const isDark = location.pathname === "/saved-news";
  const [menuOpen, setMenuOpen] = useState(false);
  const isSavedNews = location.pathname === "/saved-news";
  const hamburgerIconSrc = isSavedNews ? hamburgerBlackIcon : hamburgerIcon;

  return (
    <>
      <header className={`header${isDark ? " header--dark" : ""}`}>
        <div className="header__content">
          <span className="header__title">NewsExplorer</span>
          <button
            className="header__menu-btn"
            onClick={() => {
              setMenuOpen(!menuOpen);
              console.log("Burger clicked, menuOpen:", !menuOpen);
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <img
              src={menuOpen ? mobileCloseIcon : hamburgerIconSrc}
              alt={menuOpen ? "Close menu" : "Open menu"}
              className="header__hamburger-icon"
              width={24}
              height={24}
            />
          </button>
        </div>
        <Navigation
          showSavedLink={showSavedLink}
          onSignIn={onSignIn} // Use the handler from Main.jsx
          user={user}
          isDark={isDark}
          onLogout={onLogout}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </header>
    </>
  );
}

export default Header;
