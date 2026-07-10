import React from 'react';
import { MdClose } from 'react-icons/md';
import { 
  FaUser, 
  FaBuilding, 
  FaPhoneAlt, 
  FaStickyNote, 
  FaCalendarAlt, 
  FaFolderOpen, 
  FaChartLine, 
  FaFileInvoiceDollar, 
  FaProjectDiagram 
} from 'react-icons/fa';
import './viewClientDrawer.css';

export default function ViewClientDrawer({ isOpen, onClose, client }) {
  if (!isOpen) return null;

  const sections = [
    { title: 'Client Information', icon: <FaUser /> },
    { title: 'Company Details', icon: <FaBuilding /> },
    { title: 'Contact Details', icon: <FaPhoneAlt /> },
    { title: 'Notes', icon: <FaStickyNote /> },
    { title: 'Meetings', icon: <FaCalendarAlt /> },
    { title: 'Documents', icon: <FaFolderOpen /> },
    { title: 'Timeline', icon: <FaChartLine /> },
    { title: 'Invoices', icon: <FaFileInvoiceDollar /> },
    { title: 'Projects', icon: <FaProjectDiagram /> },
  ];

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>{client ? client.client : 'Client Name'}</h2>
          <button className="close-btn" onClick={onClose}>
            <MdClose />
          </button>
        </div>

        <div className="drawer-body">
          {sections.map((section, index) => (
            <div key={index} className="drawer-section">
              <span className="drawer-section-icon">{section.icon}</span>
              <span className="drawer-section-title">{section.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
