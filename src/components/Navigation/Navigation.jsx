import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation({ showSavedLink }) {
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
          <Link to="/signin">Sign in</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
