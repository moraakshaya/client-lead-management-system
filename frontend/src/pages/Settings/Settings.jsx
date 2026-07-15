import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import './Settings.css';

import SettingsSidebar from '../../components/settings/SettingsSidebar';
import ProfileSettings from '../../components/settings/ProfileSettings';
import SecuritySettings from '../../components/settings/SecuritySettings';
import AppearanceSettings from '../../components/settings/AppearanceSettings';
import NotificationSettings from '../../components/settings/NotificationSettings';
import PreferenceSettings from '../../components/settings/PreferenceSettings';
import AboutSettings from '../../components/settings/AboutSettings';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    // Mock saving delay
    setShowToast(false);
    setTimeout(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Auto hide after 3 seconds
    }, 300);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'preferences':
        return <PreferenceSettings />;
      case 'about':
        return <AboutSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="settings-page-container">
      <div className="settings-header">
        <div className="settings-header-content">
          <h1>Settings</h1>
          <p>Manage your account, preferences and CRM configuration</p>
        </div>
        <button className="settings-save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>

      <div className="settings-layout">
        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="settings-content">
          {renderActiveTab()}
        </div>
      </div>

      {showToast && (
        <div className="settings-toast">
          <div className="settings-toast-content">
            <h4>Settings Saved Successfully</h4>
            <p>Your preferences have been updated.</p>
          </div>
          <button className="settings-toast-close" onClick={() => setShowToast(false)}>
            <MdClose size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
