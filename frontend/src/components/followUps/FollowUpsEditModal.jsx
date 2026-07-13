import React, { useState, useEffect } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';
import CustomDropdown from '../leads/CustomDropdown';
import '../clients/editClientModal.css';

export default function FollowUpsEditModal({ isOpen, onClose, followUp }) {
  const [formData, setFormData] = useState({
    customer: '',
    type: '',
    subject: '',
    date: '',
    time: '',
    assigned: '',
    status: '',
    description: ''
  });

  useEffect(() => {
    if (followUp) {
      setFormData({
        customer: followUp.clientLead || followUp.customer || '',
        type: followUp.type || '',
        subject: followUp.subject || '',
        date: followUp.date || '',
        time: followUp.time || '',
        assigned: followUp.assigned || '',
        status: followUp.status || '',
        description: followUp.description || ''
      });
    }
  }, [followUp]);

  if (!isOpen || !followUp) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save the edited follow-up
    console.log("Saving changes:", formData);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaEdit style={{ marginRight: '10px' }}/> Edit Follow-up</h2>
          <button className="close-btn" type="button" onClick={onClose}><FaTimes /></button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form-content">
          <div className="modal-content">
            <div className="edit-form-grid" style={{ padding: '32px 40px' }}>
              
              <div className="form-group full-width">
                <label>Customer</label>
                <input 
                  type="text" 
                  name="customer" 
                  value={formData.customer} 
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Type</label>
                <CustomDropdown 
                  name="type"
                  value={formData.type} 
                  onChange={handleChange}
                  options={["Call", "Meeting", "Email", "Demo"]} 
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input 
                  type="text" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Time</label>
                <input 
                  type="text" 
                  name="time" 
                  value={formData.time} 
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Assigned To</label>
                <CustomDropdown 
                  name="assigned"
                  value={formData.assigned} 
                  onChange={handleChange}
                  options={["Rahul", "Priya", "Alex J.", "Sarah S."]} 
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <CustomDropdown 
                  name="status"
                  value={formData.status} 
                  onChange={handleChange}
                  options={["Today", "Upcoming", "Completed", "Overdue"]} 
                />
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Enter details about this follow-up..."
                  rows={4}
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
