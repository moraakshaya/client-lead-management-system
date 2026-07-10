import React from 'react';
import { FaEdit, FaEye, FaTrashAlt, FaEllipsisV, FaStickyNote, FaCalendarAlt, FaSync } from 'react-icons/fa';
import './leadsTable.css';

const mockLeads = [
  {
    id: 'LD-1042',
    customer: 'Sarah Connor',
    company: 'SkyNet Corp',
    phone: '(555) 019-2834',
    email: 'sarah@skynet.com',
    source: 'Website',
    priority: 'High',
    status: 'New',
    assignedTo: 'Alex J.',
    createdDate: 'Oct 12, 2026'
  },
  {
    id: 'LD-1043',
    customer: 'Bruce Wayne',
    company: 'Wayne Enterprises',
    phone: '(555) 234-5678',
    email: 'bruce@wayne.com',
    source: 'Referral',
    priority: 'Medium',
    status: 'Qualified',
    assignedTo: 'Sarah S.',
    createdDate: 'Oct 11, 2026'
  },
  {
    id: 'LD-1044',
    customer: 'Tony Stark',
    company: 'Stark Industries',
    phone: '(555) 987-6543',
    email: 'tony@stark.com',
    source: 'Event',
    priority: 'High',
    status: 'Contacted',
    assignedTo: 'Mike D.',
    createdDate: 'Oct 10, 2026'
  },
  {
    id: 'LD-1045',
    customer: 'Clark Kent',
    company: 'Daily Planet',
    phone: '(555) 111-2222',
    email: 'clark@dailyplanet.com',
    source: 'Social',
    priority: 'Low',
    status: 'Lost',
    assignedTo: 'Alex J.',
    createdDate: 'Oct 09, 2026'
  },
  {
    id: 'LD-1046',
    customer: 'Diana Prince',
    company: 'Themyscira Antiques',
    phone: '(555) 333-4444',
    email: 'diana@antiques.com',
    source: 'Cold Call',
    priority: 'Medium',
    status: 'Won',
    assignedTo: 'Sarah S.',
    createdDate: 'Oct 08, 2026'
  }
];

const getPriorityClass = (priority) => {
  switch(priority.toLowerCase()) {
    case 'high': return 'priority-high';
    case 'medium': return 'priority-medium';
    case 'low': return 'priority-low';
    default: return '';
  }
};

const getStatusClass = (status) => {
  switch(status.toLowerCase()) {
    case 'new': return 'status-new';
    case 'contacted': return 'status-contacted';
    case 'qualified': return 'status-qualified';
    case 'won': return 'status-won';
    case 'lost': return 'status-lost';
    default: return '';
  }
};

export default function LeadsTable({ onEditLead, onViewLead, onDeleteLead, onAddNote, onSchedule, onConvert }) {
  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Lead ID</th>
              <th>Customer</th>
              <th>Company</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Source</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Created Date</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockLeads.map((lead) => (
              <tr key={lead.id}>
                <td className="lead-id">{lead.id}</td>
                <td className="lead-customer">{lead.customer}</td>
                <td>{lead.company}</td>
                <td>{lead.phone}</td>
                <td>{lead.email}</td>
                <td>{lead.source}</td>
                <td>
                  <span className={`badge ${getPriorityClass(lead.priority)}`}>
                    {lead.priority}
                  </span>
                </td>
                <td>
                  <span className={`badge ${getStatusClass(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td>
                  <div className="assigned-user">
                    <div className="user-avatar">{lead.assignedTo.charAt(0)}</div>
                    <span>{lead.assignedTo}</span>
                  </div>
                </td>
                <td className="created-date">{lead.createdDate}</td>
                <td>
                  <div className="table-actions-dropdown">
                    <button className="action-menu-btn"><FaEllipsisV /></button>
                    <div className="dropdown-menu">
                      <button className="dropdown-item view-item" onClick={() => onViewLead && onViewLead(lead)}><FaEye /> View</button>
                      <button className="dropdown-item edit-item" onClick={() => onEditLead && onEditLead(lead)}><FaEdit /> Edit</button>
                      <button className="dropdown-item" onClick={() => onAddNote && onAddNote(lead)}><FaStickyNote /> Add Note</button>
                      <button className="dropdown-item" onClick={() => onSchedule && onSchedule(lead)}><FaCalendarAlt /> Schedule Follow-up</button>
                      <button className="dropdown-item" style={{ color: 'var(--primary)' }} onClick={() => onConvert && onConvert(lead)}><FaSync /> Convert to Client</button>
                      <div className="dropdown-divider" style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }}></div>
                      <button className="dropdown-item delete-item" onClick={() => onDeleteLead && onDeleteLead(lead)}><FaTrashAlt /> Delete</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="table-pagination">
        <span className="pagination-info">Showing 1 to 5 of 1,245 entries</span>
        <div className="pagination-controls">
          <button className="page-btn" disabled>Previous</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <span className="page-dots">...</span>
          <button className="page-btn">249</button>
          <button className="page-btn">Next</button>
        </div>
      </div>
    </div>
  );
}
