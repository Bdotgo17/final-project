import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({ showSavedLink, onSignInClick, user, onSignIn }) {
  return (
    <header className="header">
      <div className="header-content">
        <span className="header-title">NewsExplorer</span>
        <Navigation
          showSavedLink={showSavedLink}
          onSignIn={onSignIn}
          user={user}
        />
      </div>
    </header>
  );
}

export default Header;
