import "./Main.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";
import georgia from "../../assets/georgia.svg";
import { useEffect, useState } from "react";
import authorImg from "../../assets/author.jpg";
import nothingFoundImg from "../../assets/nothing-found.svg";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { fetchNews } from "../../utils/newsApi"; // Make sure this import is present
import Footer from "../Footer/Footer";
import SavedNews from "../../pages/SavedNews";
import { HashRouter } from "react-router-dom";
import About from "../About/About";

// Example articles
const demoArticles = [
  {
    id: 1,
    title: "First Article",
    content: "Lorem ipsum...",
    url: "https://example.com/1",
  },
  {
    id: 2,
    title: "Second Article",
    content: "Dolor sit amet...",
    url: "https://example.com/2",
  },
];

const useMockAuth = true; // Set to false for real logic

function Main({
  showSavedLink,
  user,
  setUser,
  savedArticles,
  setSavedArticles,
  onLogout,
  onSaveArticle,
}) {
  // Modal state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Track if a search has been made
  const [hasSearched, setHasSearched] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [showMoreActive, setShowMoreActive] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [showCount, setShowCount] = useState(3);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  async function handleSearch(query) {
    setHasSearched(true);
    setShowPreloader(true);
    setCurrentKeyword(query);
    setSearchKeyword(query); // <-- Add this line!
    setError("");
    setArticles([]);

    try {
      const data = await fetchNews(query);
      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles);
        setShowCount(3);
      } else {
        setError("");
      }
    } catch (err) {
      setError(
        "Sorry, something went wrong during the request. Please try again later."
      );
    } finally {
      setTimeout(() => setShowPreloader(false), 3000); // Only one loader, for 5 seconds
    }
  }

  function handleShowMoreClick() {
    setShowMoreActive(true);
    setShowCount((prev) => prev + 3); // <-- increment local showCount
    // Optionally, set back to false after a delay if you want the color to revert
    // setTimeout(() => setShowMoreActive(false), 200);
  }

  function handleSignIn(username) {
    setUser({ username });
    localStorage.setItem("user", JSON.stringify({ username })); // <-- persist user
    setIsLoginOpen(false);
    window.location.hash = "#/saved-news"; // If using HashRouter
  }

  function handleLogout() {
    setUser(null);
    setSavedArticles([]);
    window.location.hash = "#/"; // redirect for HashRouter
  }

  function handleRemoveArticle(articleId) {
    setSavedArticles(savedArticles.filter((a) => a.id !== articleId));
  }

  return (
    <>
      <main className="main">
        <div
          className="main__hero-wrapper"
          style={{ background: `url(${georgia}) center/cover no-repeat` }}
        >
          <Header
            user={user}
            showSavedLink={showSavedLink}
            onSignIn={() => setIsLoginOpen(true)}
            onLogout={useMockAuth ? handleLogout : onLogout}
          />{" "}
          <section className="main__hero-section">
            <SearchForm onSearch={handleSearch} />
          </section>
        </div>

        {/* Conditionally render results-block only after a search */}
        {hasSearched && (
          <section className="main__results-block">
            {!showPreloader && !error && articles && articles.length > 0 && (
              <>
                <h2 className="main__results-title">Search results</h2>
                <div className="main__news-cards-list">
                  {articles.slice(0, showCount).map((article, idx) => {
                    console.log(
                      "Rendering article:",
                      article.url,
                      "isSaved:",
                      savedArticles.some((a) => a.url === article.url)
                    );
                    return (
                      <NewsCard
                        key={idx}
                        article={{ ...article, keyword: searchKeyword }}
                        isSaved={savedArticles.some(
                          (a) => a.url === article.url
                        )}
                        onSave={(article) =>
                          onSaveArticle(article, searchKeyword)
                        }
                        isLoggedIn={!!user}
                      />
                    );
                  })}
                </div>
                {showCount < articles.length && (
                  <button
                    className={`main__show-more-btn${
                      showMoreActive ? " main__show-more-btn--active" : ""
                    }`}
                    onClick={handleShowMoreClick}
                  >
                    Show more
                  </button>
                )}
              </>
            )}

            {showPreloader && (
              <div className="main__preloader-block">
                <Preloader />
                <div className="main__preloader-text">Searching for news</div>
              </div>
            )}

            {!showPreloader && error && (
              <div className="main__results-error">{error}</div>
            )}

            {!showPreloader &&
              articles &&
              articles.length === 0 &&
              (!error || error === "Nothing Found") && (
                <div className="main__nothing-found-block">
                  <img
                    src={nothingFoundImg}
                    alt="Nothing found"
                    className="main__nothing-found-img"
                  />
                  <h2 className="main__nothing-found-title">Nothing found</h2>
                  <p className="main__nothing-found-text">
                    Sorry, but nothing matched your search terms.
                  </p>
                </div>
              )}
          </section>
        )}
        <About />
      </main>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onRegisterClick={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
        onSignIn={useMockAuth ? handleSignIn : onSignIn}
        setUser={setUser}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onLoginClick={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
}

export default Main;
