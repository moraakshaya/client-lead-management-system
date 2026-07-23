import React from "react";
import { FaUndo } from "react-icons/fa";
import "../followUps/followUpsHeader.css";

export default function ClientsHeader({ onAddClient }) {
  return (
    <div className="follow-ups-header" style={{ marginBottom: '24px' }}>
      <div className="header-titles">
        <h1 className="page-title">Clients</h1>
        <p className="text-muted">Manage your customer relationships</p>
      </div>
      <div className="header-actions">
        <button className="btn-secondary"><FaUndo style={{ marginRight: '8px' }}/> Refresh</button>
        <button className="btn-secondary">Export</button>
        <button className="btn-secondary">Import</button>
        <button className="btn-primary" onClick={onAddClient}>+ Add Client</button>
      </div>
    </div>
  );
}
