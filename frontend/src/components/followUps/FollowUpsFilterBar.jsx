import React from "react";
import { FaSearch, FaUndo } from "react-icons/fa";
import CustomDropdown from "../leads/CustomDropdown";
import "./followUpsFilterBar.css";

const FollowUpsFilterBar = () => {
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
              placeholder="Search follow-ups..." 
            />
          </div>
        </div>

        {/* Status */}
        <div className="filter-group">
          <label className="filter-label">Status</label>
          <CustomDropdown 
            placeholder="All Statuses"
            options={["Today", "Upcoming", "Completed", "Overdue"]}
          />
        </div>

        {/* Type */}
        <div className="filter-group">
          <label className="filter-label">Type</label>
          <CustomDropdown 
            placeholder="All Types"
            options={["Call", "Meeting", "Email"]}
          />
        </div>

        {/* Assigned To */}
        <div className="filter-group">
          <label className="filter-label">Assigned To</label>
          <CustomDropdown 
            placeholder="All Users"
            options={["Rahul", "Priya"]}
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
};

export default FollowUpsFilterBar;
