import React from "react";
import "./Header.css";
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ showSavedLink, onSignInClick, user, onSignIn, onLogout }) {
  const location = useLocation();
  const isDark = location.pathname === "/saved-news";

  return (
    <header className={`header${isDark ? " header-dark" : ""}`}>
      <div className="header-content">
        <span className="header-title">NewsExplorer</span>
        <Navigation
          showSavedLink={showSavedLink}
          onSignIn={onSignIn}
          user={user}
          isDark={isDark}
          onLogout={onLogout}
        />
      </div>
    </header>
  );
}

export default Header;  
         