import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/sidebar';
import Navbar from '../components/Navbar/navbar';

export default function MainLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', maxWidth: '100%', overflow: 'hidden', background: 'var(--background)', position: 'relative' }}>
      
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="mobile-sidebar-overlay"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <Sidebar isMobileOpen={isMobileSidebarOpen} setIsMobileOpen={setIsMobileSidebarOpen} />
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>
        <Navbar 
          toggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
          isMobileSidebarOpen={isMobileSidebarOpen}
        />
        <div id="main-scroll-container" className="main-content-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
