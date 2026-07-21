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
        relatedToModel: modelType || 'Lead'
      });
      setFormData({ title: '', note: '' });
      toast.success("Note saved successfully!");
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note");
    } finally {
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

        <form onSubmit={handleSubmit} className="edit-form-content">
          <div className="modal-content" style={{ overflow: 'visible' }}>
            <div className="edit-form-grid" style={{ display: 'flex', flexDirection: 'column', padding: '32px 40px' }}>
              
              <div className="form-group full-width">
                <label>{modelType || 'Client'}</label>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  {client.leadName || client.client || client.customer || 'Unknown'}
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
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? "Saving..." : "Save Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
