import React, { useState, useEffect } from 'react';
import CustomDropdown from '../../components/leads/CustomDropdown';

export default function AppearanceSettings() {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('Medium');

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(currentTheme);
  }, []);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="settings-section">
      <h2 className="settings-section-title">Appearance</h2>
      
      <div className="settings-form-group">
        <label>Theme</label>
        <div className="settings-radio-group">
          <div className="settings-radio-option">
            <input 
              type="radio" 
              id="theme-light" 
              name="theme" 
              value="light" 
              checked={theme === 'light'}
              onChange={handleThemeChange}
            />
            <label htmlFor="theme-light">Light</label>
          </div>
          <div className="settings-radio-option">
            <input 
              type="radio" 
              id="theme-dark" 
              name="theme" 
              value="dark" 
              checked={theme === 'dark'}
              onChange={handleThemeChange}
            />
            <label htmlFor="theme-dark">Dark</label>
          </div>
        </div>
      </div>

      <div className="settings-form-group">
        <label>Accent Color</label>
        <div className="settings-radio-group">
          <div className="settings-radio-option">
            <input type="radio" id="accent-blue" name="accent" value="blue" defaultChecked />
            <label htmlFor="accent-blue">Blue</label>
          </div>
          <div className="settings-radio-option">
            <input type="radio" id="accent-purple" name="accent" value="purple" />
            <label htmlFor="accent-purple">Purple</label>
          </div>
          <div className="settings-radio-option">
            <input type="radio" id="accent-green" name="accent" value="green" />
            <label htmlFor="accent-green">Green</label>
          </div>
        </div>
      </div>

      <div className="settings-form-group">
        <label>Font Size</label>
        <CustomDropdown
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          options={["Small", "Medium", "Large"]}
        />
      </div>
    </div>
  );
}
