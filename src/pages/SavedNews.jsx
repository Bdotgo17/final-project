import { useState } from "react";
import "./SavedNews.css";
import NewsCard from "../components/NewsCard/NewsCard"; // adjust the path as needed

function SavedNews({
  user,
  savedArticles =  [],
  onRemoveArticle,
}) {
  console.log("SavedNews user:", user); // <-- Add this line

  const keywords = Array.from(
    new Set(savedArticles.map((a) => a.keyword).filter(Boolean))
  );

  // Prepare the keywords display
  let keywordsLine = "";
  if (keywords.length > 0) {
    const firstTwo = keywords.slice(0, 2).join(", ");
    const othersCount = keywords.length - 2;
    keywordsLine =
      othersCount > 0
        ? `${firstTwo}, and ${othersCount} other${othersCount > 1 ? "s" : ""}`
        : firstTwo;
  } else {
    keywordsLine = "";
  }

  // Delete handler
  function handleDeleteArticle(articleToDelete) {
    if (onRemoveArticle) {
      onRemoveArticle(articleToDelete.url);
    }
  }

  return (
    <main className="Main">
      <section className="saved-news-header">
        <div className="saved-news-label">Saved articles</div>
        <h2 className="saved-news-title">
          {user
            ? `${user.username}, you have ${
                savedArticles.length
              } saved article${savedArticles.length !== 1 ? "s" : ""}`
            : "Saved Articles"}
        </h2>
        <div className="saved-news-keywords">
          By keywords: <span className="keywords-list">{keywordsLine}</span>
        </div>
      </section>
      <section className="saved-news-cards">
        <div className="news-cards-list">
          {savedArticles.slice(0, 6).map((article, idx) => (
            <NewsCard
              key={article.url || idx}
              article={article}
              isSaved={true}
              isSavedSection={true}
              onDelete={handleDeleteArticle}
              isLoggedIn={!!user}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default SavedNews;
