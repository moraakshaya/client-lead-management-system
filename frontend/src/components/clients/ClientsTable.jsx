import React from 'react';
import {
  FaEllipsisV,
  FaEye,
  FaEdit,
  FaStickyNote,
  FaCalendarAlt,
  FaTrashAlt,
  FaSpinner
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

export default function ClientsTable({ 
  clients = [], 
  pagination, 
  onPageChange, 
  onEditClient, 
  onViewClient, 
  onDeleteClient, 
  onAddNote, 
  onSchedule,
  filters,
  setFilters,
  loading
}) {
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  const getStatusClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'churned': return 'status-churned';
      default: return '';
    }
  };

  const getPriorityClass = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Determine empty state mode
  const hasSearch = !!filters?.search;
  const activeFiltersCount = Object.keys(filters || {}).filter(k => k !== 'search' && filters[k]).length;
  const hasFilters = activeFiltersCount > 0;

  const renderEmptyState = () => {
    if (hasSearch && hasFilters) {
      return (
        <td colSpan="9" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', opacity: 0.8 }}>🔍</div>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            No matching results found
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px', maxWidth: '400px', margin: '0 auto 24px auto' }}>
            No clients match your current search for <strong>"{filters.search}"</strong> and {activeFiltersCount} applied filter{activeFiltersCount > 1 ? 's' : ''}.
          </p>
          <button style={{ backgroundColor: 'transparent', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '600', transition: 'all 0.2s' }} onClick={() => setFilters({})}>Reset All Filters & Search</button>
        </td>
      );
    } else if (hasSearch) {
      return (
        <td colSpan="9" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', opacity: 0.8 }}>🔍</div>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            Client "{filters.search}" not found
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px' }}>
            We couldn't find any clients matching that name, email, or phone.
          </p>
          <button style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '500', transition: 'all 0.2s' }} onClick={() => setFilters(prev => { const f = {...prev}; delete f.search; return f; })}>Clear Search</button>
        </td>
      );
    } else if (hasFilters) {
      return (
        <td colSpan="9" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', opacity: 0.8 }}>🗂️</div>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            No clients match the selected filters
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px' }}>
            Try adjusting or removing some filters to see your clients.
          </p>
          <button style={{ backgroundColor: 'transparent', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '600', transition: 'all 0.2s' }} onClick={() => setFilters({})}>Reset Filters</button>
        </td>
      );
    } else {
      return (
        <td colSpan="9" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>👥</div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>No Clients Yet</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '16px' }}>Add a client to start managing your customer relationships.</p>
          <button style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '12px 32px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)', transition: 'transform 0.2s, box-shadow 0.2s' }} onClick={() => document.querySelector('.btn-add-client')?.click()}>+ Add Client</button>
        </td>
      );
    }
  };

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Customer</th>
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
            {loading ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                  <FaSpinner className="fa-spin" style={{ fontSize: '24px', color: 'var(--primary)', marginBottom: '12px' }} />
                  <div style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Loading clients...</div>
                </td>
              </tr>
            ) : clients.length === 0 ? (
              <tr>
                {renderEmptyState()}
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
