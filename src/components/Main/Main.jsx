import "./Main.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";
import georgia from "../../assets/georgia.svg";
console.log(georgia);

function Main({
  onSearch,
  articles,
  loading,
  error,
  showCount,
  onShowMore,
  showSavedLink,
}) {
  return (
    <main className="Main">
      <div
        className="hero-wrapper"
        style={{ background: `url(${georgia}) center/cover no-repeat` }}
      >
        <Header showSavedLink={showSavedLink} />
        <section className="hero-section">
          <SearchForm onSearch={onSearch} />
        </section>
        <section className="results-block">
          {loading && <Preloader />}
          {!loading && error && <div className="results-error">{error}</div>}
          {!loading && !error && articles && articles.length > 0 && (
            <>
              <div className="news-cards-list">
                {articles.slice(0, showCount).map((article, idx) => (
                  <NewsCard key={idx} article={article} />
                ))}
              </div>
              {showCount < articles.length && (
                <button className="show-more-btn" onClick={onShowMore}>
                  Show more
                </button>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default Main;
