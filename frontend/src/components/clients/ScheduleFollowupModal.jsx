import React, { useState } from 'react';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';
import CustomDropdown from '../leads/CustomDropdown';
import './editClientModal.css';

export default function ScheduleFollowupModal({ isOpen, onClose, client }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    type: 'Call',
    reminder: '30 Minutes Before',
    description: ''
  });

  if (!isOpen || !client) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save follow-up logic here
    onClose();
    setFormData({ date: '', time: '', type: 'Call', reminder: '30 Minutes Before', description: '' });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '550px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaCalendarAlt style={{ marginRight: '10px' }}/> Schedule Follow-up</h2>
          <button className="close-btn" type="button" onClick={onClose}><FaTimes /></button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form-content">
          <div className="modal-content" style={{ overflow: 'visible' }}>
            <div className="edit-form-grid" style={{ padding: '32px 40px' }}>
              
              <div className="form-group full-width">
                <label>Client</label>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  {client.client || client.customer}
                </div>
              </div>

              <div className="form-group">
                <label>Follow-up Date</label>
                <input 
                  type="date" 
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
                  type="time" 
                  name="time" 
                  value={formData.time} 
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
                <label>Reminder</label>
                <CustomDropdown 
                  name="reminder"
                  value={formData.reminder} 
                  onChange={handleChange}
                  options={["At time of event", "15 Minutes Before", "30 Minutes Before", "1 Hour Before", "1 Day Before"]} 
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
            <button type="submit" className="btn-save">Schedule Follow-up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
