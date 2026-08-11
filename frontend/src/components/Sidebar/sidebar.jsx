import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { getProfile } from '../../services/userService';
import { logout } from '../../services/authService';
import { BASE_URL } from '../../api/axios';

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

export default function Sidebar({ isMobileOpen, setIsMobileOpen }) {
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
          avatar: data.avatar ? `${BASE_URL}${data.avatar}` : null
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

  const handleLogout = () => {
    logout();
  };

  // On mobile, the drawer should always be expanded regardless of desktop toggle state
  const effectiveIsCollapsed = isMobileOpen ? false : isCollapsed;

  return (
    <aside className={`sidebar ${effectiveIsCollapsed ? 'collapsed' : 'expanded'} ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <Link to="/dashboard" className="logo-container" onClick={() => setIsMobileOpen(false)}>
          {effectiveIsCollapsed ? (
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
        {effectiveIsCollapsed ? <MdChevronRight /> : <MdChevronLeft />}
      </button>

      <nav className="sidebar-nav">
        <ul>
          {navigationItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                title={effectiveIsCollapsed ? item.label : ""}
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                {!effectiveIsCollapsed && <span className="nav-label">{item.label}</span>}
              </NavLink>
            </li>
          ))}
          {user.role === 'Admin' && (
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                title={effectiveIsCollapsed ? 'Users' : ""}
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="nav-icon"><MdPeople /></span>
                {!effectiveIsCollapsed && <span className="nav-label">Users</span>}
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      <div className="sidebar-utilities">
        <ul>
          <li>
            <button className="nav-link utility-btn" onClick={toggleDarkMode} title={effectiveIsCollapsed ? (isDarkMode ? "Light Mode" : "Dark Mode") : ""}>
              <span className="nav-icon"><MdOutlineDarkMode /></span>
              {!effectiveIsCollapsed && <span className="nav-label">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
              {!effectiveIsCollapsed && (
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
          {!effectiveIsCollapsed && (
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
          )}
          {!effectiveIsCollapsed && (
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

  {
    <>
      <section>
        <Sidebar>
          <header><strong>Home Identifier</strong></header>
          <nav>
            <item>
              <ul><li>Identifier spacialising in organizations.</li>
                <li>Scenario of the application.</li>
                <li>Capatilizing sector of all in one portion</li>
                <li>The applications concludes all the activities related to the management of leads and clients from an organization and its related activities.</li>
                <li>It include one portion of semi automatic lead generation</li>
              </ul>
            </item>
          </nav>
        </Sidebar>

        <section>
          <div>
            <h1>Occasion of using this Application</h1>
            <ul>
              <li>clone A @member assimble prime - A @ → 216.198.79.1</li>
              <li>clone of crm type softtware</li>
              <li>git fetch latest/changes -  abcbc58cadc522ba.vercel-dns-017.com  "coverting workspace members to main prime members" </li>
            </ul>
          </div>
        </section>
      </section>
    </>
  }
}
