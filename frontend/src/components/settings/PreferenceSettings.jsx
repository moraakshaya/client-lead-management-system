import React, { useState } from 'react';
import CustomDropdown from '../../components/leads/CustomDropdown';

export default function PreferenceSettings() {
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [timeFormat, setTimeFormat] = useState("12 Hour");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [language, setLanguage] = useState("English");
  const [defaultDashboard, setDefaultDashboard] = useState("Main Dashboard");
  const [itemsPerPage, setItemsPerPage] = useState("10");

  return (
    <div className="settings-section">
      <h2 className="settings-section-title">Preferences</h2>
      
      <div className="settings-form-group">
        <label>Date Format</label>
        <CustomDropdown
          value={dateFormat}
          onChange={(e) => setDateFormat(e.target.value)}
          options={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]}
        />
      </div>

      <div className="settings-form-group">
        <label>Time Format</label>
        <CustomDropdown
          value={timeFormat}
          onChange={(e) => setTimeFormat(e.target.value)}
          options={["12 Hour", "24 Hour"]}
        />
      </div>

      <div className="settings-form-group">
        <label>Timezone</label>
        <CustomDropdown
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          options={["Asia/Kolkata", "UTC", "America/New_York"]}
        />
      </div>

      <div className="settings-form-group">
        <label>Language</label>
        <CustomDropdown
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          options={["English", "Spanish", "French"]}
        />
      </div>
      
      <div className="settings-form-group">
        <label>Default Dashboard</label>
        <CustomDropdown
          value={defaultDashboard}
          onChange={(e) => setDefaultDashboard(e.target.value)}
          options={["Main Dashboard", "Analytics"]}
        />
      </div>
      
      <div className="settings-form-group">
        <label>Items Per Page</label>
        <CustomDropdown
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(e.target.value)}
          options={["10", "25", "50", "100"]}
        />
      </div>
    </div>
  );
}
