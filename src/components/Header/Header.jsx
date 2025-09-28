import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({ showSavedLink, onSignIn }) {
  return (
    <header className="header">
      <div className="header-content">
        <span className="header-title">NewsExplorer</span>
        <Navigation showSavedLink={showSavedLink} onSignIn={onSignIn} />
      </div>
    </header>
  );
}

export default Header;
