import React from "react";
import { FaEllipsisV, FaEye, FaEdit, FaThumbtack, FaTrashAlt } from "react-icons/fa";
import "./notesTable.css";

// We now accept notes, loading, and pagination as props!
const NotesTable = ({ notes, loading, pagination, onAction }) => {

  if (loading) {
    return (
      <div className="table-container" style={{ padding: '48px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--text-secondary)' }}>Loading notes...</h2>
      </div>
    );
  }

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
              <th>Date</th>
              <th>Title</th>
              <th>Related To</th>
              <th>Type</th>
              <th>Created By</th>
              <th>Status</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => {
              // 1. We extract the Name from the populated leadId object!
              const relatedToName = note.leadId ? (note.leadId.leadName || note.leadId.companyName || 'Unknown') : 'Unknown';

              // 2. We format the raw ISO date string into a nice readable format
              const dateObj = new Date(note.createdAt);
              const formattedDate = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

              return (
                <tr key={note._id}>
                  <td className="created-date">{formattedDate}</td>
                  <td className="lead-customer">{note.title}</td>
                  <td>{relatedToName}</td>
                  <td>
                    <span className={`badge ${note.relatedToModel === 'Lead' ? 'priority-high' : 'priority-medium'}`}>
                      {note.relatedToModel}
                    </span>
                  </td>
                  <td>
                    <div className="assigned-user">
                      {/* The avatar just grabs the first letter of the creator's name */}
                      <div className="user-avatar">{(note.createdBy || 'A').charAt(0)}</div>
                      <span>{note.createdBy}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${note.isPinned ? 'status-contacted' : 'status-new'}`}>
                      {note.isPinned ? 'Pinned' : 'Active'}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions-dropdown">
                      <button className="action-menu-btn"><FaEllipsisV /></button>
                      <div className="dropdown-menu">
                        <button className="dropdown-item view-item" onClick={() => onAction && onAction('view', note)}><FaEye /> View</button>
                        <button className="dropdown-item edit-item" onClick={() => onAction && onAction('edit', note)}><FaEdit /> Edit</button>

                        {/* Notice the Pin action toggles text based on whether it is currently pinned! */}
                        <button className="dropdown-item" style={{ color: 'var(--warning)' }} onClick={() => onAction && onAction('pin', note)}><FaThumbtack /> {note.isPinned ? 'Unpin' : 'Pin'}</button>

                        <div className="dropdown-divider" style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }}></div>
                        <button className="dropdown-item delete-item" onClick={() => onAction && onAction('delete', note)}><FaTrashAlt /> Delete</button>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="table-pagination">
        <div className="pagination-info">
          Showing page {pagination?.currentPage || 1} of {pagination?.totalPages || 1} ({pagination?.totalNotes || 0} total)
        </div>
        <div className="pagination-controls">
          <button className="page-btn" disabled={pagination?.currentPage === 1}>Previous</button>
          <button className="page-btn active">{pagination?.currentPage || 1}</button>
          <button className="page-btn" disabled={pagination?.currentPage === pagination?.totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default NotesTable;
