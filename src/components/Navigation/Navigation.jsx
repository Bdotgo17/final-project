import "./Navigation.css";
import { Link, useLocation } from "react-router-dom";
import logoutIcon from "../../assets/logout.svg"; // Adjust the path if needed
import whiteLogoutIcon from "../../assets/whiteLogout.svg"; // white icon

function Navigation({
  user,
  onSignIn,
  onLogout,
  isDark,
  menuOpen,
  setMenuOpen,
}) {
  const location = useLocation();

  // Helper: close menu and navigate
  const handleNavClick = () => setMenuOpen(false);

  console.log("Navigation render: user =", user, "menuOpen =", menuOpen);

  return (
    <nav className={`navigation ${isDark ? "navigation--dark" : ""}`}>
      {/* Desktop navigation */}
      <ul className="navigation__desktop-list">
        <li>
          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "navigation__link navigation__link--active"
                : "navigation__link"
            }
            data-underline="home"
          >
            Home
          </Link>{" "}
        </li>
        {user && (
          <li>
            <Link
              to="/saved-news"
              className={
                location.pathname === "/saved-news"
                  ? "navigation__link navigation__link--active"
                  : "navigation__link"
              }
              data-underline="saved"
            >
              Saved Articles
            </Link>
          </li>
        )}
        <li>
          {user ? (
            <button className="navigation__sign-in-btn" onClick={onLogout}>
              <span className="navigation__user-name">{user.username}</span>
              <span className="navigation__logout-icon" aria-label="Log out">
                <img
                  src={isDark ? logoutIcon : whiteLogoutIcon}
                  alt="Log out"
                  className="navigation__logout-img"
                />
              </span>
            </button>
          ) : (
            <button
              className="navigation__sign-in-btn"
              onClick={() => {
                setMenuOpen(false);
                onSignIn();
              }}
            >
              Sign in
            </button>
          )}
        </li>
      </ul>

      {/* Mobile navigation overlay */}
      {menuOpen && (
        <div
          className="navigation__mobile-overlay"
          onClick={handleNavClick}
        ></div>
      )}

      {/* Mobile navigation menu */}
      {menuOpen && (
        <div className="navigation__mobile-nav navigation__mobile-nav--open">
          <Link to="/" className="navigation__link" onClick={handleNavClick}>
            Home
          </Link>
          {user && (
            <Link
              to="/saved-news"
              className="navigation__link"
              onClick={handleNavClick}
            >
              Saved Articles
            </Link>
          )}
          {user ? (
            <button
              className="navigation__sign-in-btn"
              onClick={() => {
                handleNavClick();
                onLogout();
              }}
            >
              {user.username}
              <span className="navigation__logout-icon" aria-label="Log out">
                <img
                  src={isDark ? logoutIcon : whiteLogoutIcon}
                  alt="Log out"
                  className="navigation__logout-img"
                />
              </span>
            </button>
          ) : (
            <button
              className="navigation__sign-in-btn"
              onClick={() => {
                handleNavClick();
                onSignIn();
              }}
            >
              Sign in
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navigation;
