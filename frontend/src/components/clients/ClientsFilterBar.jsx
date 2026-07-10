import React from 'react';
import { FaSearch, FaUndo } from 'react-icons/fa';
import './clientsFilterBar.css';
import CustomDropdown from '../leads/CustomDropdown';

export default function ClientsFilterBar() {
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
              placeholder="Search clients..." 
            />
          </div>
        </div>

        {/* Client Type */}
        <div className="filter-group">
          <label className="filter-label">Client Type</label>
          <CustomDropdown 
            placeholder="All Types"
            options={["Enterprise", "Small Business", "Individual"]}
          />
        </div>

        {/* Industry */}
        <div className="filter-group">
          <label className="filter-label">Industry</label>
          <CustomDropdown 
            placeholder="All Industries"
            options={["IT", "Finance", "Healthcare", "Retail", "Manufacturing"]}
          />
        </div>

        {/* Assigned Manager */}
        <div className="filter-group">
          <label className="filter-label">Assigned Manager</label>
          <CustomDropdown 
            placeholder="All Managers"
            options={["Rahul", "Priya", "Alex", "Sarah"]}
          />
        </div>

        {/* Status */}
        <div className="filter-group">
          <label className="filter-label">Status</label>
          <CustomDropdown 
            placeholder="All Statuses"
            options={["Active", "VIP", "Inactive"]}
          />
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
