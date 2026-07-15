import React from 'react';

export default function ProfileSettings() {
  return (
    <div className="settings-section">
      <h2 className="settings-section-title">Profile</h2>
      
      <div className="settings-avatar-section">
        <div className="settings-avatar-circle">
          A
        </div>
        <div>
          <button className="settings-avatar-btn">Change Photo</button>
        </div>
      </div>

      <div className="settings-form-group">
        <label>Name</label>
        <input type="text" defaultValue="Akshaya" placeholder="Your full name" />
      </div>

      <div className="settings-form-group">
        <label>Email</label>
        <input type="email" defaultValue="akshaya@example.com" placeholder="Your email address" />
      </div>

      <div className="settings-form-group">
        <label>Phone</label>
        <input type="text" defaultValue="+91 9876543210" placeholder="Your phone number" />
      </div>

      <div className="settings-form-group">
        <label>Role</label>
        <input type="text" defaultValue="Marketing Analyst" disabled style={{ background: 'var(--surface-secondary)' }} />
      </div>

      <div className="settings-form-group">
        <label>Company</label>
        <input type="text" defaultValue="LeadFlow CRM" disabled style={{ background: 'var(--surface-secondary)' }} />
      </div>

      <div className="settings-form-group">
        <label>Bio</label>
        <textarea defaultValue="Passionate about CRM and marketing analytics." placeholder="Tell us about yourself"></textarea>
      </div>

      <button className="settings-action-btn">Update Profile</button>
    </div>
  );
}
