import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="Navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/saved-news">Saved News</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
