import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  MdSearch, 
  MdOutlineNotifications,
  MdMenu,
  MdClose
} from 'react-icons/md';
import AddLeadModal from '../leads/AddLeadModal';
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

export default function Navbar({ toggleMobileSidebar, isMobileSidebarOpen }) {
  const location = useLocation();
  const currentRoute = routeDetails[location.pathname] || { title: 'Dashboard' };
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

  return (
    <header className="top-navbar">
      <div className="navbar-section page-header">
        <img src="/logoful.png" alt="LeadFlow" className="mobile-nav-logo" />
        <h1 className="page-title">{currentRoute.title}</h1>
      </div>

      {/* 2nd & 3rd Section: Search, Notifications, Profile */}
      <div className="navbar-section utilities">
        <div className="search-box" style={{ position: 'relative' }}>
          <MdSearch className="nav-search-icon" style={{ position: 'static', margin: '0 8px 0 0', display: 'inline-block' }} />
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
          <span className="nav-badge">3</span>
        </div>

        <button className="btn-primary new-lead-btn" onClick={() => setIsAddLeadModalOpen(true)}>
          <span className="plus-icon">+</span> New Lead
        </button>

        <button className="mobile-menu-btn" onClick={toggleMobileSidebar} aria-label="Toggle Menu">
          {isMobileSidebarOpen ? <MdClose /> : <MdMenu />}
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

      <AddLeadModal 
        isOpen={isAddLeadModalOpen} 
        onClose={() => setIsAddLeadModalOpen(false)} 
      />
    </header>
  );
}
