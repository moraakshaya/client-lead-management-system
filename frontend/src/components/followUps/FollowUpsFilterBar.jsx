import React from "react";
import { FaSearch, FaUndo } from "react-icons/fa";
import CustomDropdown from "../leads/CustomDropdown";
import "./followUpsFilterBar.css";

const FollowUpsFilterBar = ({ filters = {}, setFilters, filterOptions = {} }) => {
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

  const userOptions = Array.from(new Set(["All Users", "Unassigned", ...(filterOptions?.assignedUser || [])]));

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
              placeholder="Search follow-ups..." 
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
            placeholder="All"
            options={["All", "Pending", "Contacted", "Qualified", "Completed"]}
          />
        </div>

        {/* Type */}
        <div className="filter-group">
          <label className="filter-label">Type</label>
          <CustomDropdown 
            name="type"
            value={filters?.type || ''}
            onChange={handleFilterChange}
            placeholder="All Types"
            options={["All Types", "Call", "Meeting", "Email", "Demo", "WhatsApp"]}
          />
        </div>

        {/* Assigned To */}
        <div className="filter-group">
          <label className="filter-label">Assigned To</label>
          <CustomDropdown 
            name="assignedTo"
            value={filters?.assignedTo || ''}
            onChange={handleFilterChange}
            placeholder="All Users"
            options={userOptions}
          />
        </div>
        
        {/* Date Range */}
        <div className="filter-group">
          <label className="filter-label">Date Range</label>
          <input 
            type="date" 
            name="dateRange"
            value={filters?.dateRange || ''}
            onChange={handleFilterChange}
            className="filter-input filter-date" 
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
};

export default FollowUpsFilterBar;
