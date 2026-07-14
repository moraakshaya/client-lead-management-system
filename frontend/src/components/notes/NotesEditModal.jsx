import React, { useState, useEffect } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';
import CustomDropdown from '../leads/CustomDropdown';
import '../clients/editClientModal.css';

export default function NotesEditModal({ isOpen, onClose, note }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    relatedTo: '',
    description: ''
  });

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || '',
        category: note.type || '',
        relatedTo: note.relatedTo || '',
        description: note.description || ''
      });
    }
  }, [note]);

  if (!isOpen || !note) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving note edits:", formData);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaEdit style={{ marginRight: '10px' }}/> Edit Note</h2>
          <button className="close-btn" type="button" onClick={onClose}><FaTimes /></button>
        </div>

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
                  name="category"
                  value={formData.category} 
                  onChange={handleChange}
                  options={["Sales", "Support", "General", "Meeting"]} 
                />
              </div>

              <div className="form-group">
                <label>Related To</label>
                <CustomDropdown 
                  name="relatedTo"
                  value={formData.relatedTo} 
                  onChange={handleChange}
                  options={["John Doe", "Acme Corp", "Sarah Smith", "Alex J."]} 
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
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
