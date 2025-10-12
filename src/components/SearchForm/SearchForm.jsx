import "./SearchForm.css";
import { useState } from "react";

function SearchForm({ onSearch }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(input.trim());
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} autoComplete="off">
      <div className="search-form__heading">
        <h2 className="search-form__title">What's going on in the world?</h2>
        <p className="search-form__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
      </div>
      <div className="search-form__bar-row">
        <input
          type="text"
          className="search-form__input"
          placeholder="Enter topic"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="search-form__btn">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
