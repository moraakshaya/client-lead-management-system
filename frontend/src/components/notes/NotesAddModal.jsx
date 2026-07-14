import React, { useState } from 'react';
import { FaTimes, FaStickyNote } from 'react-icons/fa';
import CustomDropdown from '../leads/CustomDropdown';
import '../clients/editClientModal.css';

export default function NotesAddModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    relatedToEntity: 'Lead',
    relatedToName: '',
    category: 'Sales',
    description: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving new note:", formData);
    onClose();
    setFormData({ title: '', relatedToEntity: 'Lead', relatedToName: '', category: 'Sales', description: '' });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaStickyNote style={{ marginRight: '10px' }}/> Add Note</h2>
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
                  placeholder="Enter note title..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Related To</label>
                <CustomDropdown 
                  name="relatedToEntity"
                  value={formData.relatedToEntity} 
                  onChange={handleChange}
                  options={["Lead", "Client", "Project", "Other"]} 
                />
              </div>

              <div className="form-group">
                <label>Select {formData.relatedToEntity}</label>
                <CustomDropdown 
                  name="relatedToName"
                  value={formData.relatedToName} 
                  onChange={handleChange}
                  options={["John Doe", "Acme Corp", "Sarah Smith"]} 
                />
              </div>

              <div className="form-group full-width">
                <label>Category</label>
                <CustomDropdown 
                  name="category"
                  value={formData.category} 
                  onChange={handleChange}
                  options={["Sales", "Support", "General", "Meeting"]} 
                />
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
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
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">Save Note</button>
          </div>
        </form>
      </div>
    </div>
  );
}
