import React from "react";
import { FaEllipsisV, FaEye, FaEdit, FaThumbtack, FaTrashAlt } from "react-icons/fa";
import "./notesTable.css";

const NotesTable = ({ notes, onAction }) => {
  if (!notes || notes.length === 0) {
    return (
      <div className="empty-state-container" style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginTop: '20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '18px' }}>No Notes Found</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Create your first note to keep track of customer conversations.</p>
        <button className="btn-primary" onClick={() => onAction && onAction('add')}>+ Add Note</button>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="notes-table">
          <thead>
            <tr>
              <th>Note ID</th>
              <th>Title</th>
              <th>Related To</th>
              <th>Type</th>
              <th>Created By</th>
              <th>Created Date</th>
              <th>Status</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={index}>
                <td className="lead-id">{note.id}</td>
                <td className="lead-customer">{note.title}</td>
                <td>{note.relatedTo}</td>
                <td>
                  <span className={`badge ${note.type === 'Lead' ? 'priority-high' : 'priority-medium'}`}>
                    {note.type}
                  </span>
                </td>
                <td>
                  <div className="assigned-user">
                    <div className="user-avatar">{note.createdBy.charAt(0)}</div>
                    <span>{note.createdBy}</span>
                  </div>
                </td>
                <td className="created-date">{note.createdDate}</td>
                <td>
                  <span className={`badge ${note.status === 'Pinned' ? 'status-contacted' : 'status-new'}`}>
                    {note.status}
                  </span>
                </td>
                <td>
                  <div className="table-actions-dropdown">
                    <button className="action-menu-btn"><FaEllipsisV /></button>
                    <div className="dropdown-menu">
                      <button className="dropdown-item view-item" onClick={() => onAction && onAction('view', note)}><FaEye /> View</button>
                      <button className="dropdown-item edit-item" onClick={() => onAction && onAction('edit', note)}><FaEdit /> Edit</button>
                      <button className="dropdown-item" style={{ color: 'var(--warning)' }} onClick={() => onAction && onAction('pin', note)}><FaThumbtack /> Pin / Unpin</button>
                      <div className="dropdown-divider" style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }}></div>
                      <button className="dropdown-item delete-item" onClick={() => onAction && onAction('delete', note)}><FaTrashAlt /> Delete</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-pagination">
        <div className="pagination-info">Showing 1 to {notes.length} of {notes.length} entries</div>
        <div className="pagination-controls">
          <button className="page-btn" disabled>Previous</button>
          <button className="page-btn active">1</button>
          <button className="page-btn" disabled>Next</button>
        </div>
      </div>
    </div>
  );
};

export default NotesTable;
