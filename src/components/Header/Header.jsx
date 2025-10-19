import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import hamburgerIcon from "../../assets/hamburger.svg";
import hamburgerBlackIcon from "../../assets/hamburgerBlack.svg";
import mobileCloseIcon from "../../assets/mobileClose.svg";
import logo from "../../assets/logo.svg"; // add your logo file (adjust path/name)

function Header({ showSavedLink, user, onSignIn, onLogout }) {
  const location = useLocation();
  const isDark = location.pathname === "/saved-news";
  const [menuOpen, setMenuOpen] = useState(false);
  const isSavedNews = location.pathname === "/saved-news";
  const hamburgerIconSrc = isSavedNews ? hamburgerBlackIcon : hamburgerIcon;

  console.log(
    "Header user prop:",
    user,
    "localStorage user:",
    localStorage.getItem("user")
  );

  return (
    <>
      <header
        className={`header${isSavedNews ? " header--light" : " header--dark"}`}
      >
        <div className={`header${menuOpen ? " header--nav-open" : ""}`}>
          <div className="header__content">
            <span className="header__title">NewsExplorer</span>
            <Link to="/" className="header__brand">
              <img src={logo} alt="NewsExplorer" className="header__logo" />
              <span className="header__title">NewsExplorer</span>
            </Link>
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
            onSignIn={onSignIn}
            user={user}
            isDark={isDark}
            onLogout={onLogout}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        </div>
      </header>
    </>
  );
}

export default Header;
