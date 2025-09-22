// Utility for interacting with the News API

const newsApiBaseUrl =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

const apiKey = import.meta.env.VITE_NEWS_API_KEY;

export async function fetchNews(query) {
  if (!query) {
    throw new Error("Please enter a keyword");
  }
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 7);

  const params = new URLSearchParams({
    q: query,
    apiKey,
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
    pageSize: "100",
  });

  const url = `${newsApiBaseUrl}?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch news articles");
  }
  return response.json();
}
