import React from "react";
import "./followUpsHeader.css";

const FollowUpsHeader = ({ onSchedule, viewMode, setViewMode }) => {
  return (
    <div className="follow-ups-header">
      <div className="header-titles">
        <h1 className="page-title">Follow-ups</h1>
        <p className="text-muted">Manage upcoming calls, meetings and reminders</p>
      </div>
      <div className="header-actions">
        <button 
          className="btn-secondary" 
          onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
        >
          {viewMode === 'list' ? 'Calendar View' : 'List View'}
        </button>
        <button className="btn-primary" onClick={onSchedule}>+ Schedule Follow-up</button>
      </div>
    </div>
  );
};

export default FollowUpsHeader;
