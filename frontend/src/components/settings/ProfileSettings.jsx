import React, { useState, useEffect, useRef } from 'react';
import { getProfile, updateProfile } from '../../services/userService';
import { FaSpinner, FaCamera, FaUpload, FaTrash } from 'react-icons/fa';


export default function ProfileSettings() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    company: '',
    bio: '',
    avatar: ''
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const { data } = await getProfile();
      setFormData({
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        role: data.role || '',
        company: data.company || '',
        bio: data.bio || '',
        avatar: data.avatar || ''
      });
      if (data.avatar) {
        setAvatarPreview(`http://localhost:5000${data.avatar}`);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading profile.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const validateField = (name, value) => {
    let error = null;
    if (name === 'name' && !value) {
      error = 'Name is required.';
    }
    if (name === 'email') {
      if (!value) {
        error = 'Email is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email.';
      }
    }
    if (name === 'phone' && value) {
      if (value.length !== 10 || !/^[6-9]\d{9}$/.test(value)) {
        error = 'Phone number must contain 10 digits and start with 6-9.';
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Live validation if the user is typing
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      
      // Auto-upload the image instantly for better UX
      setIsSaving(true);
      try {
        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('email', formData.email);
        submitData.append('phone', formData.phone);
        submitData.append('company', formData.company);
        submitData.append('bio', formData.bio);
        submitData.append('avatar', file);
        
        const { data } = await updateProfile(submitData);
        showToast('Profile image updated successfully!', 'success');
        
        if (data.avatar) {
          setAvatarPreview(`http://localhost:5000${data.avatar}`);
        }
        window.dispatchEvent(new Event('profileUpdated'));
      } catch (err) {
        console.error(err);
        showToast(err.response?.data?.message || 'Error uploading image.', 'error');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleDeleteAvatar = async () => {
    if (!avatarPreview) return;
    
    setIsSaving(true);
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('company', formData.company);
      submitData.append('bio', formData.bio);
      submitData.append('removeAvatar', 'true');
      
      const { data } = await updateProfile(submitData);
      
      setAvatarFile(null);
      setAvatarPreview(null);
      setFormData({ ...formData, avatar: '' });
      showToast('Profile image removed!', 'success');
      
      window.dispatchEvent(new Event('profileUpdated'));
    } catch (err) {
      console.error(err);
      showToast('Error removing image.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateAll()) return;
    setIsSaving(true);
    
    try {
      // Small delay so the user can actually see the loading spinner!
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('company', formData.company);
      submitData.append('bio', formData.bio);
      if (avatarFile) {
        submitData.append('avatar', avatarFile);
      }

      const { data } = await updateProfile(submitData);
      showToast('Profile updated successfully!', 'success');
      
      // Update preview with new server url
      if (data.avatar) {
        setAvatarPreview(`http://localhost:5000${data.avatar}`);
      }

      // Notify other components (like Sidebar) that the profile has changed
      window.dispatchEvent(new Event('profileUpdated'));
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Error updating profile.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const showToast = (message, type) => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}><FaSpinner className="fa-spin" style={{ fontSize: '24px', color: 'var(--primary-color)' }} /></div>;
  }

  return (
    <div className="settings-section">
      <h2 className="settings-section-title">Profile</h2>
      
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

      <div className="settings-avatar-section">
        <div 
          className="settings-avatar-circle hover-avatar" 
          style={{ 
            ...(avatarPreview ? { background: `url(${avatarPreview}) center/cover` } : {}),
            position: 'relative',
            cursor: 'pointer',
            overflow: 'hidden'
          }}
          onClick={() => fileInputRef.current.click()}
        >
          {!avatarPreview && (formData.name ? formData.name.charAt(0).toUpperCase() : 'U')}
          
          <div className="avatar-overlay">
            <FaCamera />
          </div>
        </div>

        <div className="settings-avatar-actions">
          <button 
            className="settings-avatar-btn" 
            onClick={() => fileInputRef.current.click()}
          >
            <FaUpload /> Upload New Image
          </button>
          {avatarPreview && (
            <button 
              className="settings-avatar-btn delete" 
              onClick={handleDeleteAvatar}
            >
              <FaTrash /> Remove Image
            </button>
          )}
        </div>
        
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
        />
      </div>

      <div className="settings-form-group">
        <label>Name</label>
        <input 
          type="text" 
          name="name"
          value={formData.name} 
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your full name" 
          style={errors.name ? { borderColor: '#ef4444' } : {}}
        />
        {errors.name && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
      </div>

      <div className="settings-form-group">
        <label>Email</label>
        <input 
          type="email" 
          name="email"
          value={formData.email} 
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your email address" 
          style={errors.email ? { borderColor: '#ef4444' } : {}}
        />
        {errors.email && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
      </div>

      <div className="settings-form-group">
        <label>Phone</label>
        <input 
          type="text" 
          name="phone"
          value={formData.phone} 
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your phone number" 
          style={errors.phone ? { borderColor: '#ef4444' } : {}}
        />
        {errors.phone && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
      </div>

      <div className="settings-form-group">
        <label>Role</label>
        <input type="text" value={formData.role} disabled style={{ background: 'var(--surface-secondary)' }} />
      </div>

      <div className="settings-form-group">
        <label>Company</label>
        <input 
          type="text" 
          name="company"
          value={formData.company} 
          onChange={handleChange}
          placeholder="Your company name" 
        />
      </div>

      <div className="settings-form-group">
        <label>Bio</label>
        <textarea 
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself"
        ></textarea>
      </div>

      <button className="settings-action-btn" onClick={handleUpdate} disabled={isSaving} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: isSaving ? 0.7 : 1 }}>
        {isSaving ? <><FaSpinner className="fa-spin" style={{ marginRight: '8px' }} /> Updating...</> : "Update Profile"}
      </button>
    </div>
  );
}
