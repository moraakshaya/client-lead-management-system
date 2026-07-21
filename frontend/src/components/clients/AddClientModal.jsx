import React, { useState } from 'react';
import { FaTimes, FaUserPlus } from 'react-icons/fa';
import CustomDropdown from '../leads/CustomDropdown';
import { createClient } from '../../services/clientService';
import './editClientModal.css';

export default function AddClientModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    email: '',
    phone: '',
    status: 'Active',
    assignedTo: 'Rahul',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createClient(formData);
      setFormData({
        clientName: '', company: '', email: '', phone: '',
        status: 'Active', assignedTo: 'Rahul', description: ''
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating client:", error);
      alert("Failed to save client.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaUserPlus style={{ marginRight: '10px' }}/> Add New Client</h2>
          <button className="close-btn" type="button" onClick={onClose}><FaTimes /></button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form-content">
          <div className="modal-content">
            <div className="edit-form-grid">
              <div className="form-group">
                <label>Client Name</label>
                <input 
                  type="text" 
                  name="clientName" 
                  value={formData.clientName} 
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter client name"
                />
              </div>

              <div className="form-group">
                <label>Company</label>
                <input 
                  type="text" 
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter company name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter email address"
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <CustomDropdown 
                  name="status"
                  value={formData.status}
                  options={["Active", "VIP", "Inactive"]}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Assigned To</label>
                <CustomDropdown 
                  name="assignedTo"
                  value={formData.assignedTo}
                  options={["Rahul", "Priya", "Alex", "Sarah"]}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Enter any additional details or description..."
                  rows={4}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="modal-footer edit-modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" className="btn-save" disabled={loading}>{loading ? 'Saving...' : 'Save Client'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
