import React from "react";
import { FaEllipsisV, FaEye, FaEdit, FaCheck, FaStickyNote, FaTrashAlt } from "react-icons/fa";
import "./followUpsTable.css";

// We now accept followUps, loading, and pagination as props!
const FollowUpsTable = ({ followUps, loading, pagination, onAction }) => {

  if (loading) {
    return (
      <div className="table-container" style={{ padding: '48px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--text-secondary)' }}>Loading follow-ups...</h2>
      </div>
    );
  }

  if (!followUps || followUps.length === 0) {
    return (
      <div className="table-container" style={{ padding: '48px', textAlign: 'center', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>No Follow-ups Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Schedule a follow-up to stay connected with your customers.</p>
        <button className="btn-primary" onClick={() => document.querySelector('.follow-ups-header .btn-primary').click()}>+ Schedule Follow-up</button>
      </div>
    );
  }

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
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {followUps.map((fu) => {
              // 1. We extract the Name from the populated leadId object!
              const clientName = fu.leadId ? (fu.leadId.leadName || fu.leadId.companyName || 'Unknown Lead') : 'Unknown Lead';

              // 2. We format the raw ISO date string into a nice readable format
              const dateObj = new Date(fu.followUpDate);
              const formattedDate = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

              return (
                <tr key={fu._id}>
                  <td className="follow-up-id">{formattedDate}</td>
                  <td className="client-lead-cell">{clientName}</td>
                  <td>{fu.followUpType}</td>
                  {/* We truncate very long remarks so they don't break the table */}
                  <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{fu.remarks}</td>
                  <td>
                    <span className={`badge status-badge ${fu.status.toLowerCase()}`}>
                      {fu.status}
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
            })}
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
