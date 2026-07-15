import React from 'react';

export default function SecuritySettings() {
  return (
    <div className="settings-section">
      <h2 className="settings-section-title">Security</h2>
      
      <div className="settings-form-group">
        <label>Current Password</label>
        <input type="password" placeholder="Enter current password" />
      </div>

      <div className="settings-form-group">
        <label>New Password</label>
        <input type="password" placeholder="Enter new password" />
      </div>

      <div className="settings-form-group">
        <label>Confirm Password</label>
        <input type="password" placeholder="Confirm new password" />
      </div>

      <button className="settings-action-btn" style={{ marginBottom: '24px' }}>Change Password</button>

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
