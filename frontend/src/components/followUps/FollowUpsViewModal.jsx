import React from 'react';
import { FaTimes, FaEye } from 'react-icons/fa';
import '../clients/editClientModal.css';
import '../clients/viewClientModal.css';

export default function FollowUpsViewModal({ isOpen, onClose, followUp }) {
  if (!isOpen || !followUp) return null;

  const clientName = followUp.leadId ? (followUp.leadId.leadName || followUp.leadId.companyName || 'Unknown Lead') : 'Unknown Lead';
  const assignedUser = followUp.leadId?.assignedUser?.name || 'Unassigned';
  const dateObj = followUp.followUpDate ? new Date(followUp.followUpDate) : new Date();

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaEye style={{ marginRight: '10px' }}/> Follow-up Details</h2>
          <button className="close-btn" type="button" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="modal-content" style={{ padding: '32px 40px' }}>
          <div className="view-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            
            <div className="view-item">
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer Name</label>
              <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginTop: '4px' }}>{clientName}</div>
            </div>

            <div className="view-item">
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Call Type</label>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>{followUp.followUpType}</div>
            </div>

            <div className="view-item full-width" style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Priority & Reminder</label>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>
                Priority: {followUp.priority || 'Medium'} | Reminder: {followUp.reminder || 'None'}
              </div>
            </div>

            <div className="view-item">
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Scheduled Date</label>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>{dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            </div>

            <div className="view-item">
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Scheduled Time</label>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>{dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>

            <div className="view-item">
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Assigned To</label>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>{assignedUser}</div>
            </div>

            <div className="view-item">
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</label>
              <div style={{ marginTop: '4px' }}>
                <span className={`badge status-badge ${followUp.status.toLowerCase()}`}>
                  {followUp.status}
                </span>
              </div>
            </div>

            <div className="view-item full-width" style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Description</label>
              <div style={{ fontSize: '15px', color: 'var(--text-primary)', marginTop: '4px', lineHeight: '1.5', background: 'var(--background)', padding: '16px', borderRadius: '8px' }}>
                {followUp.remarks || 'No remarks provided.'}
              </div>
            </div>

          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
