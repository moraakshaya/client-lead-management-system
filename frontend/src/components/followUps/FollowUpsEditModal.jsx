import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaEdit, FaCalendarAlt, FaClock } from 'react-icons/fa';
import CustomDropdown from '../leads/CustomDropdown';
import { updateFollowUp } from '../../services/followUpService';
import { handleApiError } from '../../utils/errorHandler';
import '../clients/editClientModal.css';

export default function FollowUpsEditModal({ isOpen, onClose, followUp, users = [], onSuccess }) {
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
  
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  useEffect(() => {
    if (followUp) {
      let dateStr = '';
      let timeStr = '';
      if (followUp.followUpDate) {
        const d = new Date(followUp.followUpDate);
        if (!isNaN(d)) {
          dateStr = d.toISOString().split('T')[0];
          timeStr = d.toTimeString().split(' ')[0].substring(0, 5);
        }
      }

      setFormData({
        customer: followUp.leadId?.leadName || followUp.leadId?.companyName || 'Unknown',
        type: followUp.followUpType || 'Call',
        date: dateStr,
        time: timeStr,
        status: followUp.status || 'Pending',
        description: followUp.remarks || ''
      });
    }
  }, [followUp]);

  if (!isOpen || !followUp) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const followUpDate = new Date(`${formData.date}T${formData.time}`);
      
      const payload = {
        followUpDate: followUpDate.toISOString(),
        followUpType: formData.type,
        remarks: formData.description,
        status: formData.status
      };

      await updateFollowUp(followUp._id, payload);
      
      setIsSuccess(true);
      if (onSuccess) onSuccess();

      setTimeout(() => {
        setIsSuccess(false);
        setIsSaving(false);
        onClose();
      }, 1500);
    } catch (err) {
      handleApiError(err, 'updateFollowUp');
      setIsSaving(false);
    }
  };


  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaEdit style={{ marginRight: '10px' }}/> Edit Follow-up</h2>
          <button className="close-btn" type="button" onClick={onClose}><FaTimes /></button>
        </div>

        {isSuccess ? (
          <div className="modal-content" style={{ padding: '64px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ marginBottom: '24px', animation: 'scaleIn 0.3s ease-out forwards' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="40" fill="#22C55E" fillOpacity="0.1" />
                <path d="M53.3333 28.3333L32.9167 48.75L26.6667 42.5L23.3333 45.8333L32.9167 55.4167L56.6667 31.6667L53.3333 28.3333Z" fill="#22C55E" />
              </svg>
            </div>
            <h2 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'center' }}>
              Follow-up Updated!
            </h2>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Changes have been saved successfully.</p>
          </div>
        ) : (
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
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Type</label>
                <CustomDropdown 
                  name="type"
                  value={formData.type} 
                  onChange={handleChange}
                  options={["Call", "Meeting", "Email", "Demo", "WhatsApp"]} 
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
                <div
                  onClick={() => {
                    try {
                      if (dateInputRef.current) dateInputRef.current.showPicker();
                    } catch (e) {
                      if (dateInputRef.current) dateInputRef.current.focus();
                    }
                  }}
                  style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                  <FaCalendarAlt style={{ position: 'absolute', left: '12px', color: 'var(--text-secondary)' }} />
                  <input
                    type="date"
                    name="date"
                    ref={dateInputRef}
                    value={formData.date}
                    onChange={handleChange}
                    className="form-input"
                    style={{ paddingLeft: '36px', width: '100%', boxSizing: 'border-box', cursor: 'pointer' }}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Time</label>
                <div
                  onClick={() => {
                    try {
                      if (timeInputRef.current) timeInputRef.current.showPicker();
                    } catch (e) {
                      if (timeInputRef.current) timeInputRef.current.focus();
                    }
                  }}
                  style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                  <FaClock style={{ position: 'absolute', left: '12px', color: 'var(--text-secondary)' }} />
                  <input
                    type="time"
                    name="time"
                    ref={timeInputRef}
                    value={formData.time}
                    onChange={handleChange}
                    className="form-input"
                    style={{ paddingLeft: '36px', width: '100%', boxSizing: 'border-box', cursor: 'pointer' }}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Assigned To</label>
                <CustomDropdown
                  name="assigned"
                  value={formData.assigned}
                  onChange={handleChange}
                  options={users && users.length > 0 ? users : ["Rahul", "Priya", "Alex J.", "Sarah S."]}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <CustomDropdown 
                  name="status"
                  value={formData.status} 
                  onChange={handleChange}
                  options={["Pending", "Contacted", "Qualified", "Completed"]} 
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
            <button type="button" className="btn-cancel" onClick={onClose} disabled={isSaving}>Cancel</button>
            <button type="submit" className="btn-save" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Changes'}</button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
