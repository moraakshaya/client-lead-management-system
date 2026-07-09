import React from 'react';
import { FaSearch, FaUndo } from 'react-icons/fa';
import './leadsFilterBar.css';
import CustomDropdown from './CustomDropdown';

export default function LeadsFilterBar() {
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
              className="filter-input filter-search-input" 
              placeholder="Search leads..." 
            />
          </div>
        </div>

        {/* Status */}
        <div className="filter-group">
          <label className="filter-label">Status</label>
          <CustomDropdown 
            placeholder="All Statuses"
            options={["New", "Contacted", "Qualified", "Proposal Sent", "Closed Won", "Closed Lost"]}
          />
        </div>

        {/* Priority */}
        <div className="filter-group">
          <label className="filter-label">Priority</label>
          <CustomDropdown 
            placeholder="All Priorities"
            options={["High", "Medium", "Low"]}
          />
        </div>

        {/* Lead Source */}
        <div className="filter-group">
          <label className="filter-label">Lead Source</label>
          <CustomDropdown 
            placeholder="All Sources"
            options={["Website", "Referral", "Social Media", "Cold Call", "Event/Trade Show"]}
          />
        </div>

        {/* Assigned User */}
        <div className="filter-group">
          <label className="filter-label">Assigned User</label>
          <CustomDropdown 
            placeholder="All Users"
            options={["Alex Johnson", "Sarah Smith", "Mike Davis"]}
          />
        </div>

        {/* Date Range */}
        <div className="filter-group">
          <label className="filter-label">Date Range</label>
          <input type="date" className="filter-input filter-date" />
        </div>

        {/* Reset Button */}
        <div className="filter-group filter-actions">
          <button className="btn-reset">
            <FaUndo /> Reset
          </button>
        </div>

      </div>
    </div>
  );
}
