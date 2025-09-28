import "./NewsCard.css";
import { useState } from "react";

// Placeholder: replace with real auth/saved logic
const isLoggedIn = false;
const isSaved = false;

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function NewsCard({ article }) {
  const [showTooltip, setShowTooltip] = useState(false);

  function handleSaveClick(e) {
    e.preventDefault();
    if (!isLoggedIn) return;
    // Add save/unsave logic here
  }

  return (
    <article className="NewsCard">
      <div className="news-card-header">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="news-image"
          />
        )}
        <button
          className={`save-icon${isLoggedIn ? " active" : ""}${
            isSaved ? " saved" : ""
          }`}
          onClick={handleSaveClick}
          onMouseEnter={() => !isLoggedIn && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label="Save article"
        >
          {/* SVG or icon for save */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isSaved ? "#2F71E5" : "none"}
            stroke="#2F71E5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
        {showTooltip && (
          <div className="save-tooltip">Sign in to save articles</div>
        )}
      </div>
      <div className="news-content">
        <span className="news-date">{formatDate(article.publishedAt)}</span>
        <h3 className="news-title">{article.title}</h3>
        <p className="news-description">{article.description}</p>
        <div className="news-source">{article.source?.name}</div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="news-link"
        >
          Read more
        </a>
      </div>
    </article>
  );
}

export default NewsCard;
