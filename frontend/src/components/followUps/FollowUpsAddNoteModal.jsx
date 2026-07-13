import React, { useState } from 'react';
import { FaTimes, FaStickyNote } from 'react-icons/fa';
import '../clients/editClientModal.css';

export default function FollowUpsAddNoteModal({ isOpen, onClose, followUp }) {
  const [noteData, setNoteData] = useState({
    title: '',
    description: ''
  });

  if (!isOpen || !followUp) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving note for:", followUp.id, noteData);
    setNoteData({ title: '', description: '' });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaStickyNote style={{ marginRight: '10px' }}/> Add Note</h2>
          <button className="close-btn" type="button" onClick={onClose}><FaTimes /></button>
        </div>

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
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">Save Note</button>
          </div>
        </form>
      </div>
    </div>
  );
}
