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
      <input
        type="text"
        className="search-input"
        placeholder="Enter keyword"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
