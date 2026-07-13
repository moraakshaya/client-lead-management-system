import React from 'react';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import '../clients/editClientModal.css';

export default function FollowUpsDeleteModal({ isOpen, onClose, followUp }) {
  if (!isOpen || !followUp) return null;

  const handleDelete = () => {
    console.log("Deleted follow-up:", followUp.id);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaTrashAlt style={{ marginRight: '10px', color: 'var(--danger)' }}/> Delete Follow-up</h2>
          <button className="close-btn" type="button" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="modal-content" style={{ padding: '32px 40px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>Are you sure?</div>
          <p style={{ color: 'var(--text-secondary)' }}>
            Do you really want to delete this follow-up for <strong>{followUp.clientLead || followUp.customer}</strong>? This action cannot be undone.
          </p>
        </div>

        <div className="modal-footer edit-modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <button type="button" className="btn-save" style={{ backgroundColor: 'var(--danger)' }} onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
