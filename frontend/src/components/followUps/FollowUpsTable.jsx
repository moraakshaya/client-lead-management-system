import React from "react";
import { FaEllipsisV, FaEye, FaEdit, FaCheck, FaStickyNote, FaTrashAlt } from "react-icons/fa";
import "./followUpsTable.css";

// We now accept followUps, loading, pagination, filters, and setFilters as props!
const FollowUpsTable = ({ followUps, loading, pagination, onAction, filters = {}, setFilters }) => {

  const hasSearch = !!filters.search;
  const activeFiltersCount = Object.keys(filters).filter(k => k !== 'search' && filters[k] && filters[k] !== 'All' && filters[k] !== 'All Types' && filters[k] !== 'All Users').length;
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
            No follow-ups match your current search for <strong>"{filters.search}"</strong> and {activeFiltersCount} applied filter{activeFiltersCount > 1 ? 's' : ''}.
          </p>
          <button style={{ backgroundColor: 'transparent', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '600', transition: 'all 0.2s' }} onClick={() => setFilters && setFilters({})}>Reset All Filters & Search</button>
        </td>
      );
    } else if (hasSearch) {
      return (
        <td colSpan="7" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', opacity: 0.8 }}>🔍</div>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            Follow-up "{filters.search}" not found
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px' }}>
            We couldn't find any follow-ups matching that search term.
          </p>
          <button style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '500', transition: 'all 0.2s' }} onClick={() => setFilters && setFilters(prev => { const f = {...prev}; delete f.search; return f; })}>Clear Search</button>
        </td>
      );
    } else if (hasFilters) {
      return (
        <td colSpan="7" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', opacity: 0.8 }}>🗂️</div>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            No follow-ups match the selected filters
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px' }}>
            Try adjusting or removing some filters to see your follow-ups.
          </p>
          <button style={{ backgroundColor: 'transparent', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '600', transition: 'all 0.2s' }} onClick={() => setFilters && setFilters({})}>Reset Filters</button>
        </td>
      );
    } else {
      return (
        <td colSpan="7" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>📅</div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>No Follow-ups Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '16px' }}>Schedule a follow-up to stay connected with your customers.</p>
          <button style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '12px 32px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)', transition: 'transform 0.2s, box-shadow 0.2s' }} onClick={() => document.querySelector('.follow-ups-header .btn-primary')?.click()}>+ Schedule Follow-up</button>
        </td>
      );
    }
  };

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="follow-ups-table">
          <thead>
            <tr>
              <th>Follow-up Date</th>
              <th>Client/Lead</th>
              <th>Type</th>
              <th>Remarks</th>
              <th>Assigned To</th>
              <th>Timing</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Searching...</span>
                </td>
              </tr>
            ) : (!followUps || followUps.length === 0) ? (
              <tr>
                {renderEmptyState()}
              </tr>
            ) : (
              followUps.map((fu) => {
              // 1. We extract the Name from the populated leadId object!
              const clientName = fu.leadId ? (fu.leadId.leadName || fu.leadId.companyName || 'Unknown Lead') : 'Unknown Lead';
              const assignedUser = fu.leadId?.assignedUser?.name || 'Unassigned';

              // 2. We format the raw ISO date string into a nice readable format
              const dateObj = new Date(fu.followUpDate);
              const formattedDate = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
              
              // 3. Compute Timing
              const getTiming = (status, date) => {
                if (status === 'Completed') return 'Completed';
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const fDate = new Date(date);
                fDate.setHours(0, 0, 0, 0);
                
                if (fDate.getTime() === today.getTime()) return 'Today';
                if (fDate.getTime() < today.getTime()) return 'Overdue';
                return 'Upcoming';
              };
              const timing = getTiming(fu.status, fu.followUpDate);

              return (
                <tr key={fu._id}>
                  <td className="follow-up-id">{formattedDate}</td>
                  <td className="client-lead-cell">{clientName}</td>
                  <td>{fu.followUpType}</td>
                  {/* We truncate very long remarks so they don't break the table */}
                  <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{fu.remarks}</td>
                  <td>{assignedUser}</td>
                  <td>
                    <span className={`badge status-badge ${timing.toLowerCase()}`}>
                      {timing}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions-dropdown">
                      <button className="action-menu-btn"><FaEllipsisV /></button>
                      <div className="dropdown-menu">
                        <button className="dropdown-item view-item" onClick={() => onAction && onAction('view', fu)}><FaEye /> View</button>
                        <button className="dropdown-item edit-item" onClick={() => onAction && onAction('edit', fu)}><FaEdit /> Edit</button>
                        <button className="dropdown-item" style={{ color: 'var(--success)' }} onClick={() => onAction && onAction('complete', fu)}><FaCheck /> Mark as Completed</button>
                        <button className="dropdown-item" onClick={() => onAction && onAction('note', fu)}><FaStickyNote /> Add Note</button>
                        <div className="dropdown-divider" style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }}></div>
                        <button className="dropdown-item delete-item" onClick={() => onAction && onAction('delete', fu)}><FaTrashAlt /> Delete</button>
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
        <span className="pagination-info">
          Showing page {pagination?.currentPage || 1} of {pagination?.totalPages || 1} ({pagination?.totalFollowUps || 0} total)
        </span>
        <div className="pagination-controls">
          <button className="page-btn" disabled={pagination?.currentPage === 1}>Previous</button>
          <button className="page-btn active">{pagination?.currentPage || 1}</button>
          <button className="page-btn" disabled={pagination?.currentPage === pagination?.totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default FollowUpsTable;
