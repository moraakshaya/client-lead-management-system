import React from "react";
import { FaUndo } from "react-icons/fa";
import "./clientsHeader.css";

export default function ClientsHeader({ onAddClient }) {
  return (
    <div className="clients-header-container">
      <div className="clients-header-left">
        <h1 className="clients-title">Clients</h1>
        <p className="clients-subtitle">Manage your customer relationships</p>
      </div>
      <div className="clients-header-right">
        <button className="btn-refresh"><FaUndo style={{ marginRight: '8px' }}/> Refresh</button>
        <button className="btn-export">Export</button>
        <button className="btn-import">Import</button>
        <button className="btn-add-client" onClick={onAddClient}>+ Add Client</button>
      </div>
    </div>
  );
}
