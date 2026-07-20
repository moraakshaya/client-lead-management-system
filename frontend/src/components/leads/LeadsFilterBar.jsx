import React from 'react';
import { FaSearch, FaUndo } from 'react-icons/fa';
import './leadsFilterBar.css';
import CustomDropdown from './CustomDropdown';

export default function LeadsFilterBar({ filters = {}, setFilters, filterOptions = {} }) {
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

  // Merge default expected options with any custom dynamic options from the database
  const statusOptions = Array.from(new Set(["New", "Contacted", "Qualified", "Won", "Lost", ...(filterOptions?.status || [])]));
  const priorityOptions = Array.from(new Set(["High", "Medium", "Low", ...(filterOptions?.priority || [])]));
  const sourceOptions = Array.from(new Set(["Website", "Referral", "Social Media", "Cold Call", "Event/Trade Show", ...(filterOptions?.source || [])]));
  const userOptions = Array.from(new Set(["Unassigned", ...(filterOptions?.assignedUser || [])]));

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
              placeholder="Search leads..." 
            />
          </div>
        </div>

        {/* Status */}
        <div className="filter-group">
          <label className="filter-label">Status</label>
          <CustomDropdown 
            name="status"
            value={filters?.status || ''}
            onChange={handleFilterChange}
            placeholder="All Statuses"
            options={statusOptions}
          />
        </div>

        {/* Priority */}
        <div className="filter-group">
          <label className="filter-label">Priority</label>
          <CustomDropdown 
            name="priority"
            value={filters?.priority || ''}
            onChange={handleFilterChange}
            placeholder="All Priorities"
            options={priorityOptions}
          />
        </div>

        {/* Lead Source */}
        <div className="filter-group">
          <label className="filter-label">Lead Source</label>
          <CustomDropdown 
            name="source"
            value={filters?.source || ''}
            onChange={handleFilterChange}
            placeholder="All Sources"
            options={sourceOptions}
          />
        </div>

        {/* Assigned User */}
        <div className="filter-group">
          <label className="filter-label">Assigned User</label>
          <CustomDropdown 
            name="assignedUser"
            value={filters?.assignedUser || ''}
            onChange={handleFilterChange}
            placeholder="All Users"
            options={userOptions}
          />
        </div>

        {/* Date Range */}
        <div className="filter-group">
          <label className="filter-label">Date Range</label>
          <input type="date" className="filter-input filter-date" />
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
