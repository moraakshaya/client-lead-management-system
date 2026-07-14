import React from "react";
import "./notesHeader.css";

const NotesHeader = ({ onAddNote, onExport }) => {
  return (
    <div className="notes-header">
      <div className="header-titles">
        <h1 className="page-title">Notes</h1>
        <p className="text-muted">Manage customer notes and conversations</p>
      </div>
      <div className="header-actions">
        <button className="btn-secondary" onClick={onExport}>Export</button>
        <button className="btn-primary" onClick={onAddNote}>+ Add Note</button>
      </div>
    </div>
  );
};

export default NotesHeader;
