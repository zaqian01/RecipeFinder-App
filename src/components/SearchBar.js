import React, { useState } from 'react';
import '../styles/components.css'; // Import component CSS

function SearchBar({ onSearch, onRandomSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="text"
        placeholder="Search recipe name or keyword..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search recipe" // Added aria-label for accessibility
      />
      <button type="submit" aria-label="Search"><i className="fas fa-search"></i> Search</button>
      <button type="button" onClick={onRandomSearch} aria-label="Get a random recipe"><i className="fas fa-dice"></i> Random Recipe</button>
    </form>
  );
}

export default SearchBar;