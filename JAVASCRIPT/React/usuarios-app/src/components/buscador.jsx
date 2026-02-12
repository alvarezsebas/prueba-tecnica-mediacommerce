import { useState } from "react";

function SearchBar({ search, setSearch, suggestions }) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSelect = (value) => {
    setSearch(value);
    setShowSuggestions(false);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar por cualquier dato..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => handleSelect(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
