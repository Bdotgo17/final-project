import "./NewsCard.css";
import { useState } from "react";
import trashGray from "../../assets/trashGray.svg";
import trashBlack from "../../assets/trashBlack.svg";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function NewsCard({
  article,
  isSaved,
  onSave,
  isLoggedIn,
  isSavedSection,
  onDelete,
}) {
  console.log("Saved card keyword:", article.keyword); // <-- Add here

  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [saveHovered, setSaveHovered] = useState(false);

  function handleSaveClick(e) {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowTooltip(true);
      return;
    }
    onSave(article);
  }

  return (
    <article className="news__card">
      <div className="news__card-header">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="news__card-image"
          />
        )}
        {isSavedSection ? (
          <div className="news__card-trashcan-wrapper">
            {article.keyword && (
              <span className="news__card-keyword-label">
                {saveHovered ? (
                  <img src={require("../../assets/blackRibbon.svg")} alt="" />
                ) : (
                  article.keyword
                )}
              </span>
            )}
            <button
              className="news__card-save-icon"
              onClick={() => onDelete(article)}
              onMouseEnter={() => setSaveHovered(true)}
              onMouseLeave={() => setSaveHovered(false)}
              aria-label="Delete article"
            >
              <img
                src={saveHovered ? trashBlack : trashGray}
                alt="Delete"
                width={24}
                height={24}
              />
            </button>
            {isHovered && (
              <div className="news__card-remove-tooltip">Remove from saved</div>
            )}
          </div>
        ) : (
          <>
            <button
              className={`news__card-save-icon${
                isSaved ? " news__card-save-icon--saved" : ""
              }`}
              onClick={handleSaveClick}
              onMouseEnter={() => !isLoggedIn && setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              aria-label={isSaved ? "Unsave article" : "Save article"}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            {showTooltip && (
              <div className="news__card-save-tooltip">
                Sign in to save articles
              </div>
            )}
          </>
        )}
      </div>
      <div className="news__card-content">
        <span className="news__card-date">
          {formatDate(article.publishedAt)}
        </span>
        <h3 className="news__card-title">{article.title}</h3>
        <p className="news__card-description">{article.description}</p>
        <div className="news__card-source">{article.source?.name}</div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="news__link"
        ></a>
      </div>
    </article>
  );
}

export default NewsCard;
