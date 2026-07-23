import React, { useState } from 'react';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import '../clients/editClientModal.css';
import { deleteNote } from '../../services/noteService';
import { handleApiError } from '../../utils/errorHandler';

export default function NotesDeleteModal({ isOpen, onClose, note, onSuccess }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !note) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteNote(note._id);
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      handleApiError(error, 'deleteNote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaTrashAlt style={{ marginRight: '10px', color: 'var(--danger)' }} /> Delete Note</h2>
          <button className="close-btn" type="button" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="modal-content" style={{ padding: '32px 40px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>
            Are you sure you want to delete this note?
          </div>

          <div style={{ background: 'var(--background)', padding: '16px', borderRadius: '8px', marginBottom: '16px', textAlign: 'left' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Title</label>
            <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginTop: '4px' }}>{note.title}</div>
          </div>

          <p style={{ color: 'var(--text-secondary)' }}>
            This action cannot be undone.
          </p>
        </div>

        <div className="modal-footer edit-modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>Cancel</button>
          <button type="button" className="btn-save" style={{ backgroundColor: 'var(--danger)' }} onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Note'}
          </button>
        </div>
      </div>
    </div>
  );
}
