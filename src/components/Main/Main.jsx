import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";

function Main({ onSearch, articles, loading, error, showCount, onShowMore }) {
  return (
    <main className="Main">
      <SearchForm onSearch={onSearch} />
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
    </main>
  );
}

export default Main;
