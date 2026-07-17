import React from 'react';
import { FaSearch, FaUndo } from 'react-icons/fa';
import './notesFilterBar.css';
import CustomDropdown from '../leads/CustomDropdown';

export default function NotesFilterBar({ filters = {}, setFilters }) {
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (setFilters) {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleReset = () => {
    if (setFilters) {
      setFilters({ type: '', status: '', search: '' });
    }
  };

  return (
    <div className="filter-bar-container">
      <div className="filter-bar-grid">
        
        {/* Search */}
        <div className="filter-group filter-search">
          <label className="filter-label">Search</label>
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              name="search"
              value={filters?.search || ''}
              onChange={handleFilterChange}
              className="filter-input filter-search-input" 
              placeholder="Search notes..." 
            />
          </div>
        </div>

        {/* Related To */}
        <div className="filter-group">
          <label className="filter-label">Related To</label>
          <CustomDropdown 
            name="type"
            value={filters?.type || ''}
            onChange={handleFilterChange}
            placeholder="All Entities"
            options={[
              { value: '', label: 'All Entities' },
              { value: 'Lead', label: 'Lead' },
              { value: 'Client', label: 'Client' }
            ]}
          />
        </div>

        {/* Status filter */}
        <div className="filter-group">
          <label className="filter-label">Status</label>
          <CustomDropdown 
            name="status"
            value={filters?.status || ''}
            onChange={handleFilterChange}
            placeholder="All Statuses"
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'Pinned', label: 'Pinned' },
              { value: 'Active', label: 'Active' }
            ]}
          />
        </div>

        {/* Reset Button */}
        <div className="filter-group filter-actions">
          <button className="btn-reset" onClick={handleReset}>
            <FaUndo /> Reset
          </button>
        </div>

      </div>
    </div>
  );
}
