import React, { useState } from 'react';
import './Filter.css';

/**
 * Filter Component
 * Provides filtering options for records by type and status
 * @param {function} onFilterChange - Callback function when filter changes
 * @param {array} types - Available record types (e.g., 'red-flag', 'intervention')
 * @param {array} statuses - Available statuses (e.g., 'Under Investigation', 'Rejected', 'Resolved')
 */
const Filter = ({ onFilterChange, types = ['red-flag', 'intervention'], statuses = ['Under Investigation', 'Rejected', 'Resolved'] }) => {
  const [activeFilters, setActiveFilters] = useState({
    type: [],
    status: []
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterToggle = (category, value) => {
    setActiveFilters(prev => {
      const updated = { ...prev };
      if (updated[category].includes(value)) {
        updated[category] = updated[category].filter(item => item !== value);
      } else {
        updated[category] = [...updated[category], value];
      }
      onFilterChange(updated);
      return updated;
    });
  };

  const handleClearFilters = () => {
    setActiveFilters({ type: [], status: [] });
    onFilterChange({ type: [], status: [] });
  };

  const activeCount = activeFilters.type.length + activeFilters.status.length;

  return (
    <div className="filter">
      <button 
        className="filter__toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="4" y1="6" x2="20" y2="6"></line>
          <line x1="4" y1="12" x2="20" y2="12"></line>
          <line x1="4" y1="18" x2="20" y2="18"></line>
        </svg>
        Filters
        {activeCount > 0 && <span className="filter__badge">{activeCount}</span>}
      </button>

      {isOpen && (
        <div className="filter__panel">
          <div className="filter__section">
            <h3 className="filter__title">Record Type</h3>
            <div className="filter__options">
              {types.map(type => (
                <label key={type} className="filter__option">
                  <input
                    type="checkbox"
                    checked={activeFilters.type.includes(type)}
                    onChange={() => handleFilterToggle('type', type)}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter__section">
            <h3 className="filter__title">Status</h3>
            <div className="filter__options">
              {statuses.map(status => (
                <label key={status} className="filter__option">
                  <input
                    type="checkbox"
                    checked={activeFilters.status.includes(status)}
                    onChange={() => handleFilterToggle('status', status)}
                  />
                  <span>{status}</span>
                </label>
              ))}
            </div>
          </div>

          {activeCount > 0 && (
            <button 
              className="filter__clear-btn"
              onClick={handleClearFilters}
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Filter;
