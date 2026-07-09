import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  MdSearch, 
  MdOutlineNotifications
} from 'react-icons/md';
import './navbar.css';

const routeDetails = {
  '/dashboard': { title: 'Dashboard' },
  '/leads': { title: 'Leads' },
  '/clients': { title: 'Clients' },
  '/follow-ups': { title: 'Follow-Ups' },
  '/notes': { title: 'Notes' },
  '/activity-timeline': { title: 'Activity Timeline' },
  '/settings': { title: 'Settings' },
  '/profile': { title: 'Profile' },
};

export default function Navbar() {
  const location = useLocation();
  const currentRoute = routeDetails[location.pathname] || { title: 'Dashboard' };

  return (
    <header className="top-navbar">
      {/* 1st Section: Page Title */}
      <div className="navbar-section page-header">
        <h1 className="page-title">{currentRoute.title}</h1>
      </div>

      {/* 2nd & 3rd Section: Search, Notifications, Profile */}
      <div className="navbar-section utilities">
        <div className="search-box">
          <MdSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="search-input"
          />
        </div>

        <div className="notification-wrapper">
          <button className="icon-btn" title="Notifications">
            <MdOutlineNotifications />
          </button>
          <span className="badge">3</span>
        </div>

        <button className="btn-primary new-lead-btn">
          <span className="plus-icon">+</span> New Lead
        </button>

        <div className="nav-profile">
          <img 
            src="/avatar-placeholder.png" 
            alt="User" 
            className="nav-avatar"
            onError={(e) => { e.target.style.display = 'none'; }} 
          />
        </div>
      </div>
    </header>
  );
}
