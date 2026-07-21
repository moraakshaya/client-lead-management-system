import React from 'react';
import { FaSearch, FaUndo } from 'react-icons/fa';
import './activityTimelineFilterBar.css';
import CustomDropdown from '../leads/CustomDropdown';

export default function ActivityTimelineFilterBar({ filters = {}, setFilters }) {
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
      setFilters({});
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
              placeholder="Search activities..." 
            />
          </div>
        </div>

        {/* Activity Type */}
        <div className="filter-group">
          <label className="filter-label">Activity Type</label>
          <CustomDropdown 
            name="type"
            value={filters?.type || ''}
            onChange={handleFilterChange}
            placeholder="All Types"
            options={["Login", "Update", "Create", "Delete", "Email", "Meeting", "Note"]}
          />
        </div>

        {/* User */}
        <div className="filter-group">
          <label className="filter-label">User</label>
          <CustomDropdown 
            name="user"
            value={filters?.user || ''}
            onChange={handleFilterChange}
            placeholder="All Users"
            options={["Admin", "System"]}
          />
        </div>

        {/* Related Module */}
        <div className="filter-group">
          <label className="filter-label">Related Module</label>
          <CustomDropdown 
            name="module"
            value={filters?.module || ''}
            onChange={handleFilterChange}
            placeholder="All Modules"
            options={["Leads", "Clients", "Notes", "System Module"]}
          />
        </div>

        {/* Date */}
        <div className="filter-group">
          <label className="filter-label">Date</label>
          <input 
            type="date" 
            name="date"
            value={filters?.date || ''}
            onChange={handleFilterChange}
            className="filter-input" 
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
