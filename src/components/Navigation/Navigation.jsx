import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation({ showSavedLink, onSignIn }) {
  return (
    <nav className="Navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {showSavedLink && (
          <li>
            <Link to="/saved-news">Saved Articles</Link>
          </li>
        )}
        <li>
          <button className="sign-in-btn" onClick={onSignIn}>
            Sign in
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
