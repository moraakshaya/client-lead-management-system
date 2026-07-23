import React, { useState } from 'react';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';
import { updateFollowUp } from '../../services/followUpService';
import { handleApiError } from '../../utils/errorHandler';
import '../clients/editClientModal.css';

export default function FollowUpsMarkCompletedModal({ isOpen, onClose, followUp, onSuccess }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !followUp) return null;

  const handleComplete = async () => {
    try {
      setIsSaving(true);
      await updateFollowUp(followUp._id, { status: "Completed" });

      setIsSuccess(true);
      if (onSuccess) onSuccess();

      setTimeout(() => {
        setIsSuccess(false);
        setIsSaving(false);
        onClose();
      }, 1500);
    } catch (err) {
      handleApiError(err, 'updateFollowUp');
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '650px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaCheckCircle style={{ marginRight: '10px', color: 'var(--success)' }} /> Mark as Completed?</h2>
          <button className="close-btn" type="button" onClick={onClose}><FaTimes /></button>
        </div>

        {isSuccess ? (
          <div className="modal-content" style={{ padding: '64px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ marginBottom: '24px', animation: 'scaleIn 0.3s ease-out forwards' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="40" fill="#22C55E" fillOpacity="0.1" />
                <path d="M53.3333 28.3333L32.9167 48.75L26.6667 42.5L23.3333 45.8333L32.9167 55.4167L56.6667 31.6667L53.3333 28.3333Z" fill="#22C55E" />
              </svg>
            </div>
            <h2 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'center' }}>
              Follow-up Completed!
            </h2>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Great job completing this task.</p>
          </div>
        ) : (
          <>
            <div className="modal-content" style={{ padding: '32px 40px' }}>
              <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>Are you sure you want to mark this follow-up as completed?</p>

              <div className="view-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', background: 'var(--background)', padding: '16px', borderRadius: '8px' }}>

                <div className="view-item">
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer</label>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginTop: '4px' }}>{followUp.leadId?.leadName || followUp.leadId?.companyName || followUp.clientLead || followUp.customer || 'Unknown Lead'}</div>
                </div>

                <div className="view-item">
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Subject</label>
                  <div style={{ fontSize: '15px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>{followUp.remarks || followUp.subject || 'Follow-up Call'}</div>
                </div>

                <div className="view-item">
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</label>
                  <div style={{ fontSize: '15px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>
                    {followUp.followUpDate ? new Date(followUp.followUpDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : (followUp.date || 'Unknown Date')}
                  </div>
                </div>

              </div>
            </div>

            <div className="modal-footer edit-modal-footer">
              <button type="button" className="btn-cancel" onClick={onClose} disabled={isSaving}>Cancel</button>
              <button type="button" className="btn-save" style={{ backgroundColor: 'var(--success)' }} onClick={handleComplete} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Mark Completed'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
