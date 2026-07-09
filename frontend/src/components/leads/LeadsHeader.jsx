import React from "react";
import "./leadsHeader.css";

export default function LeadsHeader({ onAddLead }) {
  return (
    <div className="leads-header-container">
      <div className="leads-header-left">
        <h1 className="leads-title">Leads</h1>
        <p className="leads-subtitle">Manage and track all your sales leads</p>
      </div>
      <div className="leads-header-right">
        <button className="btn-export">Export</button>
        <button className="btn-import">Import</button>
        <button className="btn-add-lead" onClick={onAddLead}>+ Add Lead</button>
      </div>
    </div>
  );
}
