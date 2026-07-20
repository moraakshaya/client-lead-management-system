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

const getPriorityClass = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high': return 'status-danger';
    case 'medium': return 'status-warning';
    case 'low': return 'status-info';
    default: return '';
  }
};

export default function ClientsTable({ 
  clients = [], 
  pagination, 
  onPageChange, 
  onEditClient, 
  onViewClient, 
  onDeleteClient, 
  onAddNote, 
  onSchedule 
}) {
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="leads-table clients-table">
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Client Name</th>
              <th>Company</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>No Clients Found</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Add a client to start managing your customer relationships.</p>
                  <button style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '10px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '500' }} onClick={() => document.querySelector('.btn-add-client')?.click()}>+ Add Client</button>
                </td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr key={client._id}>
                  <td className="lead-id">#{client._id.substring(client._id.length - 6).toUpperCase()}</td>
                  <td className="lead-customer">{client.clientName}</td>
                  <td>{client.companyName || 'N/A'}</td>
                  <td>{client.phone}</td>
                  <td>{client.email}</td>
                  <td>
                    <span className={`badge ${getPriorityClass(client.priority)}`}>
                      {client.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusClass(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="created-date">{formatDate(client.createdAt)}</td>
                  <td>
                    <div className="table-actions-dropdown">
                      <button className="action-menu-btn"><FaEllipsisV /></button>
                      <div className="dropdown-menu">
                        <button className="dropdown-item view-item" onClick={() => onViewClient && onViewClient(client)}><FaEye /> View Profile</button>
                        <button className="dropdown-item edit-item" onClick={() => onEditClient && onEditClient(client)}><FaEdit /> Edit</button>
                        <button className="dropdown-item" onClick={() => onAddNote && onAddNote(client)}><FaStickyNote /> Add Note</button>
                        <button className="dropdown-item" onClick={() => onSchedule && onSchedule(client)}><FaCalendarAlt /> Schedule Meeting</button>
                        <div className="dropdown-divider" style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }}></div>
                        <button className="dropdown-item delete-item" onClick={() => onDeleteClient && onDeleteClient(client)}><FaTrashAlt /> Delete</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <div className="table-pagination">
          <span className="pagination-info">
            Showing Page {pagination.currentPage} of {pagination.totalPages || 1} ({pagination.totalClients} total entries)
          </span>
          <div className="pagination-controls">
            <button 
              className="page-btn" 
              disabled={pagination.currentPage <= 1}
              onClick={() => onPageChange && onPageChange(pagination.currentPage - 1)}
            >
              Previous
            </button>
            <button className="page-btn active">{pagination.currentPage}</button>
            <button 
              className="page-btn" 
              disabled={pagination.currentPage >= pagination.totalPages}
              onClick={() => onPageChange && onPageChange(pagination.currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
