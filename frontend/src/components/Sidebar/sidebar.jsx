import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { getProfile } from '../../services/userService';
import { logout } from '../../services/authService';

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
  const [user, setUser] = useState({ name: 'Loading...', role: '...', avatar: null });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch profile
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setUser({
          name: data.name || 'User',
          role: data.role || 'Role',
          avatar: data.avatar ? `http://localhost:5000${data.avatar}` : null
        });
      } catch (err) {
        console.error("Failed to load user profile:", err);
      }
    };
    
    fetchProfile();
    window.addEventListener('profileUpdated', fetchProfile);

    // Check initial theme from document
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') setIsDarkMode(true);

    return () => {
      window.removeEventListener('profileUpdated', fetchProfile);
    };
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
  };

  // const handleLogout = () => {
  //   setIsProfileOpen(false);
  //   alert("Logged out successfully! (Mock)");
  //   navigate('/');
  // };

  const handleLogout = () => {
    logout();
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
          {user.role === 'Admin' && (
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                title={isCollapsed ? 'Users' : ""}
              >
                <span className="nav-icon"><MdPeople /></span>
                {!isCollapsed && <span className="nav-label">Users</span>}
              </NavLink>
            </li>
          )}
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
            {user.avatar ? (
              <img src={user.avatar} alt="User" className="user-avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div className="settings-avatar-circle" style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
          </div>
          {!isCollapsed && (
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
          )}
          {!isCollapsed && (
            <span className="dropdown-icon">
              {isProfileOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </span>
          )}
        </div>

        {isProfileOpen && (
          <div className="profile-dropdown">
            <Link to="/settings" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
              <MdPerson /> Profile
            </Link>

            <button className="dropdown-item logout-btn" onClick={handleLogout}>
              <MdLogout /> Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
