import "./Main.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";
import georgia from "../../assets/georgia.svg";
import { useState } from "react";
console.log(georgia);
import authorImg from "../../assets/author.jpg";
import nothingFoundImg from "../../assets/nothing-found.svg";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

function Main({
  onSearch,
  articles,
  loading,
  error,
  showCount,
  onShowMore,
  showSavedLink,
}) {
  // Track if a search has been made
  const [hasSearched, setHasSearched] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);

  function handleSearch(query) {
    setHasSearched(true);
    setShowPreloader(true);
    onSearch(query);

    setTimeout(() => {
      setShowPreloader(false);
    }, 5000); // 5 seconds
  }

  const [showMoreActive, setShowMoreActive] = useState(false);

  function handleShowMoreClick() {
    setShowMoreActive(true);
    onShowMore();
    // Optionally, set back to false after a delay if you want the color to revert
    // setTimeout(() => setShowMoreActive(false), 200);
  }

  console.log(
    "loading:",
    loading,
    "error:",
    error,
    "articles:",
    articles,
    "hasSearched:",
    hasSearched
  );

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <main className="Main">
        <div
          className="hero-wrapper"
          style={{ background: `url(${georgia}) center/cover no-repeat` }}
        >
          <Header
            showSavedLink={showSavedLink}
            onSignIn={() => setIsLoginOpen(true)}
          />{" "}
          <section className="hero-section">
            <SearchForm onSearch={handleSearch} />
          </section>
        </div>

        {/* Conditionally render results-block only after a search */}
        {hasSearched && (
          <section className="results-block">
            {!loading && !error && articles && articles.length > 0 && (
              <>
                <h2 className="results-title">Search results</h2>
                <div className="news-cards-list">
                  {articles.slice(0, showCount).map((article, idx) => (
                    <NewsCard key={idx} article={article} />
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

            {!loading && error && <div className="results-error">{error}</div>}

            {!loading &&
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
