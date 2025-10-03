import "./Navigation.css";
import { Link, useLocation } from "react-router-dom";

function Navigation({ showSavedLink, user, onSignIn }) {
  const location = useLocation();

  return (
    <nav className="Navigation">
      <ul>
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
            <button className="sign-in-btn">{user.username}</button>
          ) : (
            <button className="sign-in-btn" onClick={onSignIn}>
              Sign in
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
