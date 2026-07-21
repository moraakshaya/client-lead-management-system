import React, { useState, useEffect } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';
import CustomDropdown from '../leads/CustomDropdown';
import { updateNote } from '../../services/noteService';
import '../clients/editClientModal.css';

export default function NotesEditModal({ isOpen, onClose, note, onSuccess }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    relatedToModel: 'Lead',
    description: ''
  });

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || '',
        type: note.type || '',
        relatedToModel: note.relatedToModel || 'Lead',
        description: note.description || ''
      });
      setIsSuccess(false);
    }
  }, [note, isOpen]);

  if (!isOpen || !note) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await updateNote(note._id, formData);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
      
      setTimeout(() => {
        setIsSuccess(false);
        setIsSaving(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      alert("Failed to update note");
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaEdit style={{ marginRight: '10px' }}/> Edit Note</h2>
          <button className="close-btn" type="button" onClick={onClose}><FaTimes /></button>
        </div>

        {isSuccess ? (
          <div className="modal-content" style={{ padding: '64px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ marginBottom: '24px', animation: 'scaleIn 0.3s ease-out forwards' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="40" fill="#22C55E" fillOpacity="0.1"/>
                <path d="M53.3333 28.3333L32.9167 48.75L26.6667 42.5L23.3333 45.8333L32.9167 55.4167L56.6667 31.6667L53.3333 28.3333Z" fill="#22C55E"/>
              </svg>
            </div>
            <h2 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'center' }}>
              Note Updated Successfully!
            </h2>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Changes have been saved to the database.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="edit-form-content">
            <div className="modal-content">
              <div className="edit-form-grid" style={{ padding: '32px 40px' }}>
              
              <div className="form-group full-width">
                <label>Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <CustomDropdown 
                  name="type"
                  value={formData.type} 
                  onChange={handleChange}
                  options={["Sales", "Support", "General", "Meeting"]} 
                />
              </div>

              <div className="form-group">
                <label>Related To Type</label>
                <CustomDropdown 
                  name="relatedToModel"
                  value={formData.relatedToModel} 
                  onChange={handleChange}
                  options={["Lead", "Client"]} 
                />
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange}
                  className="form-textarea"
                  rows={5}
                ></textarea>
              </div>

            </div>
          </div>

          <div className="modal-footer edit-modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={isSaving}>Cancel</button>
            <button type="submit" className="btn-save" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
