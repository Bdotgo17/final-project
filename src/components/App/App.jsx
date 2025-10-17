import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../../pages/SavedNews";
import { useState } from "react";
import { fetchNews } from "../../utils/newsApi";
import Header from "../Header/Header";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCount, setShowCount] = useState(3);
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const showSavedLink = articles.length > 0;
  const [savedArticles, setSavedArticles] = useState([]);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  function handleShowMore() {
    setShowCount((prev) => prev + 3);
  }

  function handleLogout() {
    setUser(null); // Log out the user
    // Optionally clear savedArticles or other state here
    navigate("/"); // Redirect to home page
  }

  function handleSaveArticle(article, keyword) {
    setSavedArticles((prev) => {
      const updated = prev.some((a) => a.url === article.url)
        ? prev.filter((a) => a.url !== article.url) // Unsave if already saved
        : [...prev, { ...article, keyword }]; // <-- use the keyword argument here
      console.log("Updated savedArticles:", updated);
      return updated;
    });
  }

  function handleRemoveArticle(articleUrl) {
    setSavedArticles(savedArticles.filter((a) => a.url !== articleUrl));
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
                onSaveArticle={handleSaveArticle}
                onSignIn={() => {
                  console.log("Sign in clicked");
                  setIsLoginOpen(true);
                }}
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
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
              <SavedNews
                user={user}
                savedArticles={savedArticles}
                onRemoveArticle={handleRemoveArticle}
              />
            </>
          }
        />
      </Routes>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        setUser={setUser}
        // ...other props as needed...
      />
      <Footer />
    </div>
  );
}

export default App;
