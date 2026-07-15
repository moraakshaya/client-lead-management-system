import React from 'react';

export default function NotificationSettings() {
  return (
    <div className="settings-section">
      <h2 className="settings-section-title">Notifications</h2>
      
      <div className="settings-form-group">
        <label style={{ fontSize: '16px', marginBottom: '16px' }}>Email Notifications</label>
        
        <div className="settings-checkbox-group">
          <input type="checkbox" id="email-new-lead" defaultChecked />
          <label htmlFor="email-new-lead">New Lead</label>
        </div>
        
        <div className="settings-checkbox-group">
          <input type="checkbox" id="email-followup" defaultChecked />
          <label htmlFor="email-followup">Follow-up Reminder</label>
        </div>
        
        <div className="settings-checkbox-group">
          <input type="checkbox" id="email-notes" defaultChecked />
          <label htmlFor="email-notes">Notes</label>
        </div>
        
        <div className="settings-checkbox-group">
          <input type="checkbox" id="email-weekly" />
          <label htmlFor="email-weekly">Weekly Reports</label>
        </div>
      </div>

      <div className="settings-form-group" style={{ marginTop: '32px' }}>
        <label style={{ fontSize: '16px', marginBottom: '16px' }}>Desktop Notifications</label>
        
        <div className="settings-checkbox-group">
          <input type="checkbox" id="desktop-notif" defaultChecked />
          <label htmlFor="desktop-notif">ON/OFF</label>
        </div>
      </div>
    </div>
  );
}
