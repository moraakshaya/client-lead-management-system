import React from 'react';
import {
  FaEllipsisV,
  FaEye,
  FaEdit,
  FaStickyNote,
  FaCalendarAlt,
  FaTrashAlt
} from 'react-icons/fa';
import './clientsTable.css';

const mockClients = [
  {
    id: 'CL-001',
    client: 'John',
    company: 'ABC Ltd',
    email: 'john@abc.com',
    industry: 'IT',
    manager: 'Rahul',
    since: '2026',
    status: 'Active'
  },
  {
    id: 'CL-002',
    client: 'David',
    company: 'XYZ Ltd',
    email: 'david@xyz.com',
    industry: 'Finance',
    manager: 'Priya',
    since: '2026',
    status: 'VIP'
  },
  {
    id: 'CL-003',
    client: 'David bell',
    company: 'XYZ Ltd',
    email: 'dbell@xyz.com',
    industry: 'Finance',
    manager: 'Priya',
    since: '2026',
    status: 'VIP'
  },
  {
    id: 'CL-004',
    client: 'Rao',
    company: 'XYZ Ltd',
    email: 'rao@xyz.com',
    industry: 'Finance',
    manager: 'Priya',
    since: '2026',
    status: 'VIP'
  },
  {
    id: 'CL-005',
    client: 'Ronalod',
    company: 'XYZ Ltd',
    email: 'ronalod@xyz.com',
    industry: 'Finance',
    manager: 'Priya',
    since: '2026',
    status: 'VIP'
  }
];

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'active': return 'status-won';
    case 'vip': return 'status-qualified';
    case 'inactive': return 'status-lost';
    default: return '';
  }
};

export default function ClientsTable({ onViewClient, onEditClient, onAddNote, onSchedule, onDeleteClient }) {
  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Client</th>
              <th>Company</th>
              <th>Industry</th>
              <th>Manager</th>
              <th>Since</th>
              <th>Status</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockClients.map((client) => (
              <tr key={client.id}>
                <td className="lead-id">{client.id}</td>
                <td className="lead-customer">{client.client}</td>
                <td>{client.company}</td>
                <td>{client.industry}</td>
                <td>
                  <div className="assigned-user">
                    <div className="user-avatar">{client.manager.charAt(0)}</div>
                    <span>{client.manager}</span>
                  </div>
                </td>
                <td className="created-date">{client.since}</td>
                <td>
                  <span className={`badge ${getStatusClass(client.status)}`}>
                    {client.status}
                  </span>
                </td>
                <td>
                  <div className="table-actions-dropdown">
                    <button className="action-menu-btn"><FaEllipsisV /></button>
                    <div className="dropdown-menu">
                      <button className="dropdown-item view-item" onClick={() => onViewClient && onViewClient(client)}><FaEye /> View</button>
                      <button className="dropdown-item edit-item" onClick={() => onEditClient && onEditClient(client)}><FaEdit /> Edit</button>
                      <button className="dropdown-item" onClick={() => onAddNote && onAddNote(client)}><FaStickyNote /> Add Note</button>
                      <button className="dropdown-item" onClick={() => onSchedule && onSchedule(client)}><FaCalendarAlt /> Schedule Follow-up</button>
                      <div className="dropdown-divider" style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }}></div>
                      <button className="dropdown-item delete-item" onClick={() => onDeleteClient && onDeleteClient(client)}><FaTrashAlt /> Delete</button>
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
