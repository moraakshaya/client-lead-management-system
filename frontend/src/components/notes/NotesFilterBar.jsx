import React from 'react';
import { FaSearch, FaUndo } from 'react-icons/fa';
import './notesFilterBar.css';
import CustomDropdown from '../leads/CustomDropdown';

export default function NotesFilterBar() {
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
              placeholder="Search notes..." 
            />
          </div>
        </div>

        {/* Category */}
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <CustomDropdown 
            placeholder="All Categories"
            options={["Meeting", "Call", "Email", "General"]}
          />
        </div>

        {/* Related To */}
        <div className="filter-group">
          <label className="filter-label">Related To</label>
          <CustomDropdown 
            placeholder="All Entities"
            options={["Lead", "Client", "Project", "Other"]}
          />
        </div>

        {/* Created By */}
        <div className="filter-group">
          <label className="filter-label">Created By</label>
          <CustomDropdown 
            placeholder="All Users"
            options={["Alex Johnson", "Sarah Smith", "Mike Davis"]}
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
