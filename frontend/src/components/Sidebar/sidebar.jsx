import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  MdHome,
  MdPeople,
  MdBusinessCenter,
  MdCalendarToday,
  MdArticle,
  MdHistory,
  MdSettings,
  MdOutlineDarkMode,
  MdLogout,
  MdPerson,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdChevronLeft,
  MdChevronRight
} from 'react-icons/md';
import './sidebar.css';

const navigationItems = [
  { label: 'Dashboard', icon: <MdHome />, path: '/dashboard' },
  { label: 'Leads', icon: <MdPeople />, path: '/leads' },
  { label: 'Follow-Ups', icon: <MdCalendarToday />, path: '/follow-ups' },
  { label: 'Notes', icon: <MdArticle />, path: '/notes' },
  { label: 'Activity Timeline', icon: <MdHistory />, path: '/activity-timeline' },
  { label: 'Clients', icon: <MdBusinessCenter />, path: '/clients' },
  { label: 'Settings', icon: <MdSettings />, path: '/settings' },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme from document
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') setIsDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <div className="sidebar-header">
        <Link to="/" className="logo-container">
          {isCollapsed ? (
            <img src="/1.png" alt="LeadClient" className="logo-icon" />
          ) : (
            <img src="/logoful.png" alt="LeadClient Management" className="logo-full" />
          )}
        </Link>
      </div>
      <button
        className="collapse-edge-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle Sidebar"
      >
        {isCollapsed ? <MdChevronRight /> : <MdChevronLeft />}
      </button>

      <nav className="sidebar-nav">
        <ul>
          {navigationItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                title={isCollapsed ? item.label : ""}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="nav-label">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-utilities">
        <ul>
          <li>
            <button className="nav-link utility-btn" onClick={toggleDarkMode} title={isCollapsed ? (isDarkMode ? "Light Mode" : "Dark Mode") : ""}>
              <span className="nav-icon"><MdOutlineDarkMode /></span>
              {!isCollapsed && <span className="nav-label">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
              {!isCollapsed && (
                <div className={`theme-switch ${isDarkMode ? 'dark' : ''}`}>
                  <div className="switch-knob"></div>
                </div>
              )}
            </button>
          </li>
        </ul>
      </div>

      <div className="sidebar-footer">
        <div
          className={`user-profile ${isProfileOpen ? 'open' : ''}`}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <div className="user-avatar-placeholder">
            {/* Using an image placeholder, but fallback to icon if missing */}
            <img src="/avatar-placeholder.png" alt="User" className="user-avatar" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
            <MdPerson className="user-avatar-icon" style={{ display: 'none', fontSize: '24px', color: 'var(--text-secondary)' }} />
          </div>
          {!isCollapsed && (
            <div className="user-info">
              <span className="user-name">Akshaya</span>
              <span className="user-role">Marketing Analyst</span>
            </div>
          )}
          {!isCollapsed && (
            <span className="dropdown-icon">
              {isProfileOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </span>
          )}
        </div>

        {isProfileOpen && !isCollapsed && (
          <div className="profile-dropdown">
            <Link to="/profile" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
              <MdPerson /> Profile
            </Link>

            <button className="dropdown-item logout-btn" onClick={() => setIsProfileOpen(false)}>
              <MdLogout /> Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
