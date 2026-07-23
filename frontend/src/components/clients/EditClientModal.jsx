import React, { useState, useEffect } from 'react';
import { FaTimes, FaEdit, FaSpinner } from 'react-icons/fa';
import CustomDropdown from '../leads/CustomDropdown';
import { updateClient } from '../../services/clientService';
import { toast } from 'react-toastify';
import { handleApiError } from '../../utils/errorHandler';
import './editClientModal.css';

export default function EditClientModal({ isOpen, onClose, client, onSuccess }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    status: 'Active',
    priority: 'Standard',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (client) {
      setFormData({
        clientName: client.clientName || client.name || '',
        companyName: client.companyName || client.company || '',
        email: client.email || '',
        phone: client.phone || '',
        status: client.status || 'Active',
        priority: client.priority || 'Standard',
        description: client.description || ''
      });
      setIsSuccess(false);
      setErrors({});
      setTouched({});
    }
  }, [client, isOpen]);

  if (!isOpen) return null;

  const validateField = (name, value) => {
    let error = "";
    if (name === 'clientName' && !value.trim()) {
      error = "Client name is required.";
    }
    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Please enter a valid email address.";
    }
    if (name === 'phone') {
      if (!value || value.trim() === '') {
        error = "Phone number is required.";
      } else if (/[^0-9]/.test(value)) {
        error = "Phone number can contain only digits.";
      } else if (value.length !== 10) {
        error = "Phone number must contain exactly 10 digits.";
      } else if (!/^[6-9]\d{9}$/.test(value)) {
        error = "Please enter a valid Indian mobile number.";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone' && value.length > 10) {
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);
    
    const allTouched = {};
    Object.keys(formData).forEach(key => allTouched[key] = true);
    setTouched(allTouched);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setIsSaving(true);
      await updateClient(client._id, formData);
      setIsSuccess(true);
      toast.success("Client updated successfully!");
      if (onSuccess) onSuccess();
      
      setTimeout(() => {
        setIsSuccess(false);
        setIsSaving(false);
        onClose();
      }, 2000);
    } catch (error) {
      handleApiError(error, 'updateClient');
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaEdit style={{ marginRight: '10px' }}/> Edit Client</h2>
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
              Client Updated Successfully!
            </h2>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Changes have been saved to the database.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="edit-form-content">
            <div className="modal-content">
              <div className="edit-form-grid">
              <div className="form-group full-width">
                <label>Client Name</label>
                <input 
                  type="text" 
                  name="clientName" 
                  value={formData.clientName} 
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  className={`form-input ${touched.clientName && errors.clientName ? 'input-error' : ''}`}
                  placeholder="Enter full name"
                />
                {touched.clientName && errors.clientName && <span className="error-text">{errors.clientName}</span>}
              </div>

              <div className="form-group full-width">
                <label>Company</label>
                <input 
                  type="text" 
                  name="companyName" 
                  value={formData.companyName} 
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  className="form-input"
                  placeholder="Enter company"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  className={`form-input ${touched.email && errors.email ? 'input-error' : ''}`}
                  placeholder="Enter email address"
                />
                {touched.email && errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  className={`form-input ${touched.phone && errors.phone ? 'input-error' : ''}`}
                  placeholder="Enter phone number"
                />
                {touched.phone && errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Status</label>
                <CustomDropdown 
                  name="status"
                  value={formData.status}
                  options={["Active", "Inactive"]}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Priority</label>
                <CustomDropdown 
                  name="priority"
                  value={formData.priority}
                  options={["Standard", "VIP"]}
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
            <button type="button" className="btn-cancel" onClick={onClose} disabled={isSaving}>Cancel</button>
            <button type="submit" className="btn-save" disabled={isSaving} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isSaving ? <><FaSpinner className="fa-spin" style={{ marginRight: '8px' }} /> Saving...</> : 'Save Changes'}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
