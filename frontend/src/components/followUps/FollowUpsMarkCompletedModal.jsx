import React from 'react';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';
import '../clients/editClientModal.css';

export default function FollowUpsMarkCompletedModal({ isOpen, onClose, followUp }) {
  if (!isOpen || !followUp) return null;

  const handleComplete = () => {
    console.log("Marked as completed:", followUp.id);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '450px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaCheckCircle style={{ marginRight: '10px', color: 'var(--success)' }}/> Mark as Completed?</h2>
          <button className="close-btn" type="button" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="modal-content" style={{ padding: '32px 40px' }}>
          <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>Are you sure you want to mark this follow-up as completed?</p>
          
          <div className="view-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', background: 'var(--background)', padding: '16px', borderRadius: '8px' }}>
            
            <div className="view-item">
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer</label>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginTop: '4px' }}>{followUp.clientLead || followUp.customer}</div>
            </div>

            <div className="view-item">
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Subject</label>
              <div style={{ fontSize: '15px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>{followUp.subject || 'Follow-up Call'}</div>
            </div>

            <div className="view-item">
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</label>
              <div style={{ fontSize: '15px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>{followUp.date}</div>
            </div>

          </div>
        </div>

        <div className="modal-footer edit-modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <button type="button" className="btn-save" style={{ backgroundColor: 'var(--success)' }} onClick={handleComplete}>Mark Completed</button>
        </div>
      </div>
    </div>
  );
}
