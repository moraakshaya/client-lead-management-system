import React from "react";
import "./activityTimelineHeader.css";

const ActivityTimelineHeader = ({ onExport, onRefresh }) => {
  return (
    <div className="timeline-header">
      <div className="header-titles">
        <h1 className="page-title">Activity Timeline</h1>
        <p className="text-muted">Track every action happening in your CRM</p>
      </div>
      <div className="header-actions">
        <button className="btn-secondary" onClick={onExport}>Export Logs</button>
        <button className="btn-primary" onClick={onRefresh}>Refresh</button>
      </div>
    </div>
  );
};

export default ActivityTimelineHeader;
