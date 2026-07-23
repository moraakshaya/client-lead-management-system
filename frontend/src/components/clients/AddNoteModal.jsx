import React, { useState } from 'react';
import { FaTimes, FaStickyNote } from 'react-icons/fa';
import './editClientModal.css';
import { createNote } from '../../services/noteService';
import { toast } from 'react-toastify';

export default function AddNoteModal({ isOpen, onClose, client, modelType, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    note: ''
  });
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !client) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createNote({
        leadId: client._id,
        title: formData.title,
        notes: formData.note,
        relatedToModel: modelType || 'Client'
      });
      
      setIsSuccess(true);
      if (onSuccess) onSuccess();

      setTimeout(() => {
        setIsSuccess(false);
        setLoading(false);
        setFormData({ title: '', note: '' });
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Failed to save note");
      setLoading(false);
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
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>The note has been successfully attached.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="edit-form-content">
            <div className="modal-content" style={{ overflow: 'visible' }}>
            <div className="edit-form-grid" style={{ display: 'flex', flexDirection: 'column', padding: '32px 40px' }}>
              
              <div className="form-group full-width">
                <label>{modelType || 'Client'}</label>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  {client.clientName || client.leadName || client.customer || client.client || 'Unknown'}
                </div>
              </div>

              <div className="form-group full-width" style={{ marginTop: '16px' }}>
                <label>Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Note title"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Note</label>
                <textarea 
                  name="note" 
                  value={formData.note} 
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Type your note here..."
                  rows={6}
                  required
                ></textarea>
              </div>

            </div>
          </div>

          <div className="modal-footer edit-modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" className="btn-save" disabled={loading}>{loading ? 'Saving...' : 'Save Note'}</button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
