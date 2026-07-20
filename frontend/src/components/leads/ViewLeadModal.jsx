import React from 'react';
import { FaTimes, FaUser, FaStickyNote, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import '../clients/viewClientModal.css';

export default function ViewLeadModal({ isOpen, onClose, lead }) {
  if (!isOpen || !lead) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaUser style={{ marginRight: '10px' }}/> Lead Details</h2>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="modal-content">
          {/* Basic Information */}
          <div className="modal-section">
            <h3 className="section-title"><span className="icon-wrapper"><FaUser /></span> Basic Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Lead Name</span>
                <span className="info-value">{lead.leadName || '-'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Company</span>
                <span className="info-value">{lead.companyName || '-'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{lead.email || '-'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone</span>
                <span className="info-value">{lead.phone || '-'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className="info-value">
                  <span className={`status-badge ${lead.status?.toLowerCase() === 'won' || lead.status?.toLowerCase() === 'new' ? 'status-active' : ''}`}>
                    {lead.status || '-'}
                  </span>
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Priority</span>
                <span className="info-value">{lead.priority || '-'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Source</span>
                <span className="info-value">{lead.source || '-'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Assigned To</span>
                <span className="info-value">{lead.assignedUser?.name || lead.assignedUser || '-'}</span>
              </div>
              <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                <span className="info-label">Created Date</span>
                <span className="info-value">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }) : '-'}</span>
              </div>
            </div>
          </div>

          {/* Recent Notes */}
          <div className="modal-section">
            <h3 className="section-title"><span className="icon-wrapper"><FaStickyNote /></span> Recent Notes</h3>
            <ul className="notes-list">
              <li>{lead.notes || "No recent notes found."}</li>
            </ul>
          </div>

          {/* Upcoming Follow-up */}
          <div className="modal-section">
            <h3 className="section-title"><span className="icon-wrapper"><FaCalendarAlt /></span> Upcoming Follow-up</h3>
            <div className="followup-box">
              <div className="followup-date">PENDING</div>
              <div className="followup-desc">No follow-up scheduled yet</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="modal-section">
            <h3 className="section-title"><span className="icon-wrapper"><FaChartLine /></span> Recent Activity</h3>
            <ul className="activity-list">
              <li><span className="check-icon">✓</span> Lead Captured from {lead.source || "System"}</li>
              <li><span className="check-icon">✓</span> Assigned to {lead.assignedTo || "User"}</li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
