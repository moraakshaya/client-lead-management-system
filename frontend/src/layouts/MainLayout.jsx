import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/sidebar';
import Navbar from '../components/Navbar/navbar';

export default function MainLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--background)' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Navbar />
        <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
