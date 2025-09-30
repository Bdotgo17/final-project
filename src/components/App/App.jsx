import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import LoginModal from "../LoginModal/LoginModal";
import Footer from "../Footer/Footer";
import SavedNews from "../../pages/SavedNews";
import { useState } from "react";
import { fetchNews } from "../../utils/newsApi";
import Preloader from "../Preloader/Preloader";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCount, setShowCount] = useState(3);

  const showSavedLink = articles.length > 0;

  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  async function handleSearch(query) {
    if (!query) {
      setError("Please enter a keyword");
      setArticles([]);
      return;
    }
    setLoading(true);
    setError("");
    setArticles([]);
    try {
      const data = await fetchNews(query);
      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles);
        setShowCount(3);
      } else {
        setError("Nothing Found");
      }
    } catch (err) {
      setError(
        "Sorry, something went wrong during the request. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleShowMore() {
    setShowCount((prev) => prev + 3);
  }

  function handleSignIn(username) {
    setUser({ username }); // or setUser({ username: ... }) if you have more info
    setIsLoginOpen(false);
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main
                  onSearch={handleSearch}
                  articles={articles}
                  loading={loading}
                  error={error}
                  showCount={showCount}
                  onShowMore={handleShowMore}
                  showSavedLink={showSavedLink}
                  user={user}
                  setUser={setUser}
                  onSignIn={() => setIsLoginOpen(true)}
                />
                <LoginModal
                  isOpen={isLoginOpen}
                  onClose={() => setIsLoginOpen(false)}
                  onSignIn={handleSignIn}
                />
              </>
            }
          />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
