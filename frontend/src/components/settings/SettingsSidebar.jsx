import React from 'react';
import {
  MdPerson,
  MdLock,
  MdPalette,
  MdNotifications,
  MdSettings,
  MdInfo
} from 'react-icons/md';

export default function SettingsSidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <MdPerson /> },
    { id: 'security', label: 'Security', icon: <MdLock /> },
    { id: 'appearance', label: 'Appearance', icon: <MdPalette /> },
    { id: 'notifications', label: 'Notifications', icon: <MdNotifications /> },
    { id: 'preferences', label: 'Preferences', icon: <MdSettings /> },
    { id: 'about', label: 'About', icon: <MdInfo /> },
  ];

  return (
    <aside className="settings-sidebar">
      <ul className="settings-sidebar-nav">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="settings-nav-icon">{tab.icon}</span>
              <span className="settings-nav-label">{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
