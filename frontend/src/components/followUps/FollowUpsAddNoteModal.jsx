import React, { useState } from 'react';
import { FaTimes, FaStickyNote } from 'react-icons/fa';
import { createNote } from '../../services/noteService';
import { handleApiError } from '../../utils/errorHandler';
import '../clients/editClientModal.css';

export default function FollowUpsAddNoteModal({ isOpen, onClose, followUp, onSuccess }) {
  const [noteData, setNoteData] = useState({
    title: '',
    description: ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !followUp) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const payload = {
        leadId: followUp.leadId?._id || followUp.leadId,
        title: noteData.title,
        notes: noteData.description
      };
      
      await createNote(payload);
      
      setIsSuccess(true);
      if (onSuccess) onSuccess();

      setTimeout(() => {
        setIsSuccess(false);
        setIsSaving(false);
        setNoteData({ title: '', description: '' });
        onClose();
      }, 1500);
    } catch (err) {
      handleApiError(err, 'createNote');
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaStickyNote style={{ marginRight: '10px' }}/> Add Note</h2>
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
              Note Added!
            </h2>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>The note has been attached to the client/lead.</p>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="edit-form-content">
          <div className="modal-content">
            <div className="edit-form-grid" style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div className="form-group full-width">
                <label>Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={noteData.title} 
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter note title..."
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea 
                  name="description" 
                  value={noteData.description} 
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Write your note here..."
                  rows={5}
                  required
                ></textarea>
              </div>

            </div>
          </div>

          <div className="modal-footer edit-modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={isSaving}>Cancel</button>
            <button type="submit" className="btn-save" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Note'}</button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
