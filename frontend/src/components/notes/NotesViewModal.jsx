import React from 'react';
import { FaTimes, FaEye } from 'react-icons/fa';
import '../clients/editClientModal.css';

export default function NotesViewModal({ isOpen, onClose, note }) {
  if (!isOpen || !note) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaEye style={{ marginRight: '10px' }}/> Note Details</h2>
          <button className="close-btn" type="button" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="modal-content" style={{ padding: '32px 40px' }}>
          <div className="view-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            
            <div className="view-item full-width" style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Title</label>
              <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginTop: '4px' }}>{note.title}</div>
            </div>

            <div className="view-item">
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Related To</label>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>{note.relatedTo}</div>
            </div>

            <div className="view-item">
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</label>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>{note.type}</div>
            </div>

            <div className="view-item full-width" style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Description</label>
              <div style={{ fontSize: '15px', color: 'var(--text-primary)', marginTop: '4px', lineHeight: '1.5', background: 'var(--background)', padding: '16px', borderRadius: '8px' }}>
                {note.description || 'Customer is interested in the Premium Plan.\nRequested a demo next week.'}
              </div>
            </div>

            <div className="view-item">
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Created By</label>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>{note.createdBy}</div>
            </div>

            <div className="view-item">
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Created On</label>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>{note.createdDate}</div>
            </div>

          </div>
        </div>

        <div className="modal-footer edit-modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose} style={{ padding: '10px 24px', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', background: 'var(--surface)' }}>Close</button>
        </div>
      </div>
    </div>
  );
}
