import React from "react";
import { FaEllipsisV, FaEye, FaEdit, FaThumbtack, FaTrashAlt } from "react-icons/fa";
import "./notesTable.css";

// We now accept notes, loading, and pagination as props!
const NotesTable = ({ notes, loading, pagination, filters, setFilters, onAction }) => {
  // Determine empty state mode
  const hasSearch = !!filters?.search;
  const activeFiltersCount = Object.keys(filters || {}).filter(k => k !== 'search' && filters[k]).length;
  const hasFilters = activeFiltersCount > 0;

  const renderEmptyState = () => {
    if (hasSearch && hasFilters) {
      return (
        <td colSpan="7" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', opacity: 0.8 }}>🔍</div>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            No matching results found
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px', maxWidth: '400px', margin: '0 auto 24px auto' }}>
            No notes match your current search for <strong>"{filters.search}"</strong> and {activeFiltersCount} applied filter{activeFiltersCount > 1 ? 's' : ''}.
          </p>
          <button style={{ backgroundColor: 'transparent', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '600', transition: 'all 0.2s' }} onClick={() => setFilters({})}>Reset All Filters & Search</button>
        </td>
      );
    } else if (hasSearch) {
      return (
        <td colSpan="7" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', opacity: 0.8 }}>🔍</div>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            Note "{filters.search}" not found
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px' }}>
            We couldn't find any notes matching that title.
          </p>
          <button style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '500', transition: 'all 0.2s' }} onClick={() => setFilters(prev => { const f = {...prev}; delete f.search; return f; })}>Clear Search</button>
        </td>
      );
    } else if (hasFilters) {
      return (
        <td colSpan="7" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', opacity: 0.8 }}>🗂️</div>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            No notes match the selected filters
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px' }}>
            Try adjusting or removing some filters to see your notes.
          </p>
          <button style={{ backgroundColor: 'transparent', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '600', transition: 'all 0.2s' }} onClick={() => setFilters({})}>Reset Filters</button>
        </td>
      );
    } else {
      return (
        <td colSpan="7" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>📝</div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>No Notes Yet</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '16px' }}>Create your first note to keep track of customer conversations.</p>
          <button style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '12px 32px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)', transition: 'transform 0.2s, box-shadow 0.2s' }} onClick={() => onAction && onAction('add')}>+ Add Note</button>
        </td>
      );
    }
  };

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
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Searching...</span>
                </td>
              </tr>
            ) : (!notes || notes.length === 0) ? (
              <tr>
                {renderEmptyState()}
              </tr>
            ) : (
              notes.map((note) => {
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
              })
            )}
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
