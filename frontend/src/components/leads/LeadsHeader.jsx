import React from "react";
import "../followUps/followUpsHeader.css";

export default function LeadsHeader({ onAddLead, onExport, onImport }) {
  return (
    <div className="follow-ups-header" style={{ marginBottom: '24px' }}>
      <div className="header-titles">
        <h1 className="page-title">Leads</h1>
        <p className="text-muted">Manage and track all your sales leads</p>
      </div>
      <div className="header-actions">
        <button className="btn-secondary" onClick={onExport}>Export</button>
        <button className="btn-secondary" onClick={onImport}>Import</button>
        <button className="btn-primary" onClick={onAddLead}>+ Add Lead</button>
      </div>
    </div>
  );
}
