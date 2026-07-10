import React from 'react';
import { FaTimes, FaUser, FaStickyNote, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import './viewClientModal.css';

export default function ViewClientModal({ isOpen, onClose, client }) {
  if (!isOpen) return null;

  // Fallback to placeholder if client is empty
  const clientData = client || {
    client: 'John Doe',
    company: 'ABC Technologies',
    email: 'john@example.com',
    phone: '+91 9876543210',
    status: 'Active',
    manager: 'Rahul',
    since: '15 Jul 2026'
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaUser style={{ marginRight: '10px' }}/> Client Details</h2>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="modal-content">
          {/* Basic Information */}
          <div className="modal-section">
            <h3 className="section-title"><span className="icon-wrapper"><FaUser /></span> Basic Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Client Name</span>
                <span className="info-value">{clientData.client}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Company</span>
                <span className="info-value">{clientData.company}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{clientData.email || 'john@example.com'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone</span>
                <span className="info-value">{clientData.phone || '+91 9876543210'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className="info-value">
                  <span className={`status-badge ${clientData.status?.toLowerCase() === 'active' || clientData.status?.toLowerCase() === 'vip' ? 'status-active' : ''}`}>
                    {clientData.status}
                  </span>
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Assigned To</span>
                <span className="info-value">{clientData.manager}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Client Since</span>
                <span className="info-value">{clientData.since}</span>
              </div>
            </div>
          </div>

          <hr className="section-divider" />

          {/* Recent Notes */}
          <div className="modal-section">
            <h3 className="section-title"><span className="icon-wrapper"><FaStickyNote /></span> Recent Notes</h3>
            <ul className="notes-list">
              <li>Interested in Premium Plan</li>
              <li>Requested Demo</li>
            </ul>
          </div>

          <hr className="section-divider" />

          {/* Upcoming Follow-up */}
          <div className="modal-section">
            <h3 className="section-title"><span className="icon-wrapper"><FaCalendarAlt /></span> Upcoming Follow-up</h3>
            <div className="followup-box">
              <div className="followup-date">25 Jul 2026</div>
              <div className="followup-desc">Product Demo</div>
            </div>
          </div>

          <hr className="section-divider" />

          {/* Recent Activity */}
          <div className="modal-section">
            <h3 className="section-title"><span className="icon-wrapper"><FaChartLine /></span> Recent Activity</h3>
            <ul className="activity-list">
              <li><span className="check-icon">✓</span> Client Created</li>
              <li><span className="check-icon">✓</span> Note Added</li>
              <li><span className="check-icon">✓</span> Follow-up Scheduled</li>
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
