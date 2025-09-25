import "./SearchForm.css";
import { useState } from "react";

function SearchForm({ onSearch }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(input.trim());
  }

  return (
    <form className="SearchForm" onSubmit={handleSubmit} autoComplete="off">
      <div className="search-heading">
        <h2 className="search-title">What's going on in the world?</h2>
        <p className="search-subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
      </div>
      <div className="search-bar-row">
        <input
          type="text"
          className="search-input"
          placeholder="Enter topic"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
