import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({ showSavedLink }) {
  return (
    <header className="header">
      <Navigation showSavedLink={showSavedLink} />
    </header>
  );
}

export default Header;
