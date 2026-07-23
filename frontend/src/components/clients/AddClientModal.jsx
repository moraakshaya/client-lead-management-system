import React, { useState } from 'react';
import { FaTimes, FaUserPlus, FaSpinner } from 'react-icons/fa';
import CustomDropdown from '../leads/CustomDropdown';
import { createClient } from '../../services/clientService';
import { toast } from 'react-toastify';
import { handleApiError } from '../../utils/errorHandler';
import './editClientModal.css';

export default function AddClientModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    email: '',
    phone: '',
    status: 'Active',
    priority: 'Standard',
    assignedTo: 'Rahul',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  React.useEffect(() => {
    if (isOpen) {
      setErrors({});
      setTouched({});
    }
  }, [isOpen]);

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
      setLoading(true);
      await createClient(formData);
      setFormData({
        clientName: '', company: '', email: '', phone: '',
        status: 'Active', priority: 'Standard', assignedTo: 'Rahul', description: ''
      });
      toast.success("Client added successfully!");
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      handleApiError(error, 'createClient');
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
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange} 
                  onBlur={handleBlur}
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
            <button type="submit" className="btn-save" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {loading ? <><FaSpinner className="fa-spin" style={{ marginRight: '8px' }} /> Saving...</> : 'Save Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
