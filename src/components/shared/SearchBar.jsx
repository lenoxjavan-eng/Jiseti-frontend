import React, { useState } from 'react';
import './SearchBar.css';

/**
 * SearchBar Component
 * Provides search functionality for records
 * @param {function} onSearch - Callback function when search value changes
 * @param {string} placeholder - Placeholder text for the search input
 */
const SearchBar = ({ onSearch, placeholder = 'Search by title or description...' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <div className="search-bar__input-wrapper">
        <svg className="search-bar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          className="search-bar__input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
        />
        {searchTerm && (
          <button className="search-bar__clear" onClick={handleClear} title="Clear search">
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
