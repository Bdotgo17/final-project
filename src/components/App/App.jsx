import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../../pages/SavedNews";
import { useState } from "react";
import { fetchNews } from "../../utils/newsApi";
import Header from "../Header/Header";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCount, setShowCount] = useState(3);
  const [user, setUser] = useState(null);

  const showSavedLink = articles.length > 0;
  const [savedArticles, setSavedArticles] = useState([]);
  const navigate = useNavigate();

  function handleShowMore() {
    setShowCount((prev) => prev + 3);
  }

  function handleLogout() {
    setUser(null); // Log out the user
    // Optionally clear savedArticles or other state here
    navigate("/"); // Redirect to home page
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main
                articles={articles}
                loading={loading}
                error={error}
                showCount={showCount}
                showSavedLink={showSavedLink}
                user={user}
                setUser={setUser}
                savedArticles={savedArticles}
                setSavedArticles={setSavedArticles}
                onLogout={handleLogout}
              />
            </>
          }
        />
        <Route
          path="/saved-news"
          element={
            <>
              <Header
                user={user}
                showSavedLink={showSavedLink}
                onSignIn={() => setIsLoginOpen(true)}
                theme="dark"
                onLogout={handleLogout}
              />
              <SavedNews user={user} savedArticles={savedArticles} />
            </>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
