import React, { useState } from 'react';
import { updatePassword } from '../../services/userService';
import { FaSpinner } from 'react-icons/fa';

export default function SecuritySettings() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const validateField = (name, value, allData = formData) => {
    let error = null;
    if (name === 'currentPassword' && !value) {
      error = 'Required.';
    }
    if (name === 'newPassword') {
      if (!value) {
        error = 'Required.';
      } else {
        const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!pwdRegex.test(value)) {
          error = 'Password must be at least 8 chars long and include upper, lower, number, and special character.';
        }
      }
      
      // Also re-validate confirmPassword if newPassword changes
      if (allData.confirmPassword && allData.confirmPassword !== value) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
      } else if (allData.confirmPassword && allData.confirmPassword === value) {
        setErrors(prev => ({ ...prev, confirmPassword: null }));
      }
    }
    
    if (name === 'confirmPassword') {
      if (value !== allData.newPassword) {
        error = 'Passwords do not match.';
      }
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    
    const error = validateField(name, value, newData);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value, formData);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key], formData);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateAll()) return;
    setIsSaving(true);
    
    try {
      // Small delay to make the spinner visible!
      await new Promise(resolve => setTimeout(resolve, 800));

      await updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      showToast('Password changed successfully!', 'success');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Error updating password.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const showToast = (message, type) => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="settings-section">
      <h2 className="settings-section-title">Security</h2>
      
      {toastMessage && (
        <div style={{
          padding: '12px 16px',
          marginBottom: '20px',
          borderRadius: '4px',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: toastMessage.type === 'success' ? '#10b981' : '#ef4444'
        }}>
          {toastMessage.type === 'success' ? '✔' : '✖'} {toastMessage.message}
        </div>
      )}

      <div className="settings-form-group">
        <label>Current Password</label>
        <input 
          type="password" 
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter current password" 
          style={errors.currentPassword ? { borderColor: '#ef4444' } : {}}
        />
        {errors.currentPassword && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.currentPassword}</span>}
      </div>

      <div className="settings-form-group">
        <label>New Password</label>
        <input 
          type="password" 
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter new password" 
          style={errors.newPassword ? { borderColor: '#ef4444' } : {}}
        />
        {errors.newPassword && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.newPassword}</span>}
      </div>

      <div className="settings-form-group">
        <label>Confirm Password</label>
        <input 
          type="password" 
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Confirm new password" 
          style={errors.confirmPassword ? { borderColor: '#ef4444' } : {}}
        />
        {errors.confirmPassword && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.confirmPassword}</span>}
      </div>

      <button className="settings-action-btn" onClick={handleUpdate} disabled={isSaving} style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: isSaving ? 0.7 : 1 }}>
        {isSaving ? <><FaSpinner className="fa-spin" style={{ marginRight: '8px' }} /> Updating...</> : "Change Password"}
      </button>

      <h3 className="settings-section-title" style={{ marginTop: '24px', fontSize: '16px' }}>Two-Factor Authentication</h3>
      <div className="settings-checkbox-group">
        <input type="checkbox" id="2fa-toggle" />
        <label htmlFor="2fa-toggle">Enable Two-Factor Authentication</label>
      </div>

      <h3 className="settings-section-title" style={{ marginTop: '32px', fontSize: '16px', color: '#ef4444' }}>Device Management</h3>
      <button className="settings-action-btn" style={{ background: '#ef4444', color: 'white' }}>Logout From All Devices</button>
    </div>
  );
}
