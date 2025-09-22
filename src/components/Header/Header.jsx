import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({ showSavedLink }) {
  return (
    <header className="header">
      <div className="header-content">
        <Navigation showSavedLink={showSavedLink} />
      </div>
    </header>
  );
}

export default Header;
