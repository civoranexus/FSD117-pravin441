import React, { useState } from 'react';
import { useMovies } from '../context/MovieContext';

function SearchBar() {
  const [input, setInput] = useState('');
  const { searchMovies, loading } = useMovies();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      searchMovies(input);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for movies..."
        className="search-input"
        disabled={loading}
      />
      <button type="submit" className="search-btn" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchBar;