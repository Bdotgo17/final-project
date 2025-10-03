function SavedNews({ user, savedArticles = [] }) {
  return (
    <main className="Main">
      <section className="saved-news-header">
        <h2>
          {user ? `${user.username}'s Saved Articles` : "Saved Articles"}
        </h2>
        <p>
          {user
            ? `You have ${savedArticles.length} saved article${savedArticles.length !== 1 ? "s" : ""}.`
            : "Sign in to see your saved articles."}
        </p>
      </section>
      <section className="saved-news-cards">
        {savedArticles.length === 0 ? (
          <p>No saved articles yet.</p>
        ) : (
          savedArticles.map((article, idx) => (
            <div className="saved-article-card" key={idx}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default SavedNews;