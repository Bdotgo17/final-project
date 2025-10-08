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
    <nav className={`Navigation ${isDark ? "header-dark" : ""}`}>
      <ul className="desktop-nav">
        <li>
          <Link
            to="/"
            className={
              location.pathname === "/" ? "nav-link active" : "nav-link"
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
                  ? "nav-link active"
                  : "nav-link"
              }
              data-underline="saved"
            >
              Saved Articles
            </Link>
          </li>
        )}
        <li>
          {user ? (
            <button className="sign-in-btn" onClick={onLogout}>
              {user.username}
              <span className="logout-icon" aria-label="Log out">
                {/* Paste your SVG here */}
                {/* Example SVG: */}
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
              className="sign-in-btn"
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
      {/* Mobile navigation: only show when menuOpen is true */}
      {menuOpen && <div className="mobile-overlay"></div>}
      {menuOpen && (
        <div className={`mobile-nav${menuOpen ? " open" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          {user && (
            <Link
              to="/saved-news"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Saved Articles
            </Link>
          )}
          {user ? (
            <button className="sign-in-btn" onClick={onLogout}>
              {user.username}
              <span className="logout-icon" aria-label="Log out">
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
              className="sign-in-btn"
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
