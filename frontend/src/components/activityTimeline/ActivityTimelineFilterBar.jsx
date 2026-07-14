import React from 'react';
import { FaSearch, FaUndo } from 'react-icons/fa';
import './activityTimelineFilterBar.css';
import CustomDropdown from '../leads/CustomDropdown';

export default function ActivityTimelineFilterBar() {
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
              placeholder="Search activities..." 
            />
          </div>
        </div>

        {/* Activity Type */}
        <div className="filter-group">
          <label className="filter-label">Activity Type</label>
          <CustomDropdown 
            placeholder="All Types"
            options={["Login", "Update", "Create", "Delete", "Email", "Meeting"]}
          />
        </div>

        {/* User */}
        <div className="filter-group">
          <label className="filter-label">User</label>
          <CustomDropdown 
            placeholder="All Users"
            options={["Alex Johnson", "Sarah Smith", "Mike Davis", "System"]}
          />
        </div>

        {/* Related Module */}
        <div className="filter-group">
          <label className="filter-label">Related Module</label>
          <CustomDropdown 
            placeholder="All Modules"
            options={["Leads", "Clients", "Notes", "Tasks", "System"]}
          />
        </div>

        {/* Date */}
        <div className="filter-group">
          <label className="filter-label">Date</label>
          <input type="date" className="filter-input" />
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
