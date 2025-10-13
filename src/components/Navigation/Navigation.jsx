import "./Navigation.css";
import { Link, useLocation } from "react-router-dom";
import logoutIcon from "../../assets/logout.svg"; // Adjust the path if needed
import whiteLogoutIcon from "../../assets/whiteLogout.svg"; // white icon

function Navigation({
  showSavedLink,
  user,
  onSignIn,
  onLogout,
  isDark,
  menuOpen,
  setMenuOpen,
}) {
  const location = useLocation();

  return (
    <nav className={`navigation ${isDark ? "navigation--dark" : ""}`}>
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
              {user.username}
              <span className="navigation__logout-icon" aria-label="Log out">
                <img
                  src={isDark ? logoutIcon : whiteLogoutIcon}
                  alt="Log out"
                  style={{
                    marginLeft: "8px",
                    verticalAlign: "middle",
                    width: "18px",
                    height: "18px",
                  }}
                />
              </span>
            </button>
          ) : (
            <button
              className="navigation__sign-in-btn"
              onClick={() => {
                console.log("Sign in button clicked in Navigation");
                setMenuOpen(false);
                onSignIn();
              }}
            >
              Sign in
            </button>
          )}
        </li>
      </ul>
      {/* Mobile navigation: only show when menuOpen is true */}
      {menuOpen && <div className="navigation__mobile-overlay"></div>}
      {menuOpen && (
        <div
          className={`navigation__mobile-nav${
            menuOpen ? " navigation__mobile-nav--open" : ""
          }`}
        >
          <Link
            to="/"
            className="navigation__link"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          {user && (
            <Link
              to="/saved-news"
              className="navigation__link"
              onClick={() => setMenuOpen(false)}
            >
              Saved Articles
            </Link>
          )}
          {user ? (
            <button className="navigation__sign-in-btn" onClick={onLogout}>
              {user.username}
              <span className="navigation__logout-icon" aria-label="Log out">
                <img
                  src={isDark ? logoutIcon : whiteLogoutIcon}
                  alt="Log out"
                  style={{
                    marginLeft: "8px",
                    verticalAlign: "middle",
                    width: "18px",
                    height: "18px",
                  }}
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
        </div>
      )}
    </nav>
  );
}

export default Navigation;
