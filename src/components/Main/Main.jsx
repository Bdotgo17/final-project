import "./Main.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";
import georgia from "../../assets/georgia.svg";
import { useState } from "react";
import authorImg from "../../assets/author.jpg";
import nothingFoundImg from "../../assets/nothing-found.svg";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { fetchNews } from "../../utils/newsApi"; // Make sure this import is present

function Main({
  showSavedLink,
  user,
  setUser,
  savedArticles,
  setSavedArticles,
  onLogout,
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

  async function handleSearch(query) {
    setHasSearched(true);
    setShowPreloader(true);
    setCurrentKeyword(query);
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
    setIsLoginOpen(false);
  }

  function handleSaveArticle(article) {
    setSavedArticles((prev) => {
      // If already saved, remove it (unsave)
      if (prev.some((a) => a.url === article.url)) {
        return prev.filter((a) => a.url !== article.url);
      }
      // If not saved, add it
      return [...prev, { ...article, keyword: currentKeyword }];
    });
  }

  return (
    <>
      <main className="Main">
        <div
          className="hero-wrapper"
          style={{ background: `url(${georgia}) center/cover no-repeat` }}
        >
          <Header
            user={user}
            showSavedLink={showSavedLink}
            onSignIn={() => setIsLoginOpen && setIsLoginOpen(true)}
            onLogout={onLogout}
          />{" "}
          <section className="hero-section">
            <SearchForm onSearch={handleSearch} />
          </section>
        </div>

        {/* Conditionally render results-block only after a search */}
        {hasSearched && (
          <section className="results-block">
            {!showPreloader && !error && articles && articles.length > 0 && (
              <>
                <h2 className="results-title">Search results</h2>
                <div className="news-cards-list">
                  {articles.slice(0, showCount).map((article, idx) => (
                    <NewsCard
                      key={idx}
                      article={article}
                      isSaved={savedArticles.some((a) => a.url === article.url)}
                      onSave={handleSaveArticle}
                      isLoggedIn={!!user}
                    />
                  ))}
                </div>
                {showCount < articles.length && (
                  <button
                    className={`show-more-btn${
                      showMoreActive ? " active" : ""
                    }`}
                    onClick={handleShowMoreClick}
                  >
                    Show more
                  </button>
                )}
              </>
            )}

            {showPreloader && (
              <div className="preloader-block">
                <Preloader />
                <div className="preloader-text">Searching for news</div>
              </div>
            )}

            {!showPreloader && error && (
              <div className="results-error">{error}</div>
            )}

            {!showPreloader &&
              articles &&
              articles.length === 0 &&
              (!error || error === "Nothing Found") && (
                <div className="nothing-found-block">
                  <img
                    src={nothingFoundImg}
                    alt="Nothing found"
                    className="nothing-found-img"
                  />
                  <h2 className="nothing-found-title">Nothing found</h2>
                  <p className="nothing-found-text">
                    Sorry, but nothing matched your search terms.
                  </p>
                </div>
              )}
          </section>
        )}

        {/* About Author section always at the bottom */}
        <section className="about-author">
          <img
            src="https://images.freeimages.com/images/large-previews/9a3/black-crumpled-paper-texture-1158396.jpg?fmt=webp&w=500"
            alt="Author"
            className="author-image"
            width={464}
            height={464}
          />
          <div className="author-info">
            <h2>About the Author</h2>
            <p>
              Baruc Gomez is a dedicated web developer with a passion for
              creating intuitive and dynamic user experiences. With a keen eye
              for design, Baruc combines technical expertise with creativity to
              build responsive and engaging websites. When not coding, Baruc
              enjoys spending time with family.
            </p>
          </div>
        </section>
      </main>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onRegisterClick={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
        onSignIn={handleSignIn}
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
