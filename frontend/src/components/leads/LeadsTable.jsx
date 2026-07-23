import React from 'react';
import { FaEdit, FaEye, FaTrashAlt, FaEllipsisV, FaStickyNote, FaCalendarAlt, FaSync, FaSpinner } from 'react-icons/fa';
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

export default function LeadsTable({ 
  leads = [], 
  loading = false,
  pagination, 
  onPageChange, 
  onEditLead, 
  onViewLead, 
  onDeleteLead, 
  onAddNote, 
  onSchedule, 
  onConvert,
  filters,
  setFilters
}) {
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  const getStatusClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'new': return 'status-new';
      case 'contacted': return 'status-contacted';
      case 'qualified': return 'status-qualified';
      case 'won': return 'status-won';
      case 'lost': return 'status-lost';
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
        <td colSpan="11" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', opacity: 0.8 }}>🔍</div>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            No matching results found
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px', maxWidth: '400px', margin: '0 auto 24px auto' }}>
            No leads match your current search for <strong>"{filters.search}"</strong> and {activeFiltersCount} applied filter{activeFiltersCount > 1 ? 's' : ''}.
          </p>
          <button style={{ backgroundColor: 'transparent', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '600', transition: 'all 0.2s' }} onClick={() => setFilters({})}>Reset All Filters & Search</button>
        </td>
      );
    } else if (hasSearch) {
      return (
        <td colSpan="11" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', opacity: 0.8 }}>🔍</div>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            Lead "{filters.search}" not found
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px' }}>
            We couldn't find any leads matching that name, email, or phone.
          </p>
          <button style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '500', transition: 'all 0.2s' }} onClick={() => setFilters(prev => { const f = {...prev}; delete f.search; return f; })}>Clear Search</button>
        </td>
      );
    } else if (hasFilters) {
      return (
        <td colSpan="11" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', opacity: 0.8 }}>🗂️</div>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            No leads match the selected filters
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px' }}>
            Try adjusting or removing some filters to see your leads.
          </p>
          <button style={{ backgroundColor: 'transparent', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '600', transition: 'all 0.2s' }} onClick={() => setFilters({})}>Reset Filters</button>
        </td>
      );
    } else {
      return (
        <td colSpan="11" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>🎯</div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>No Leads Yet</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '16px' }}>Start by adding your first lead to grow your business.</p>
          <button style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '12px 32px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)', transition: 'transform 0.2s, box-shadow 0.2s' }} onClick={() => document.querySelector('.btn-add-lead')?.click()}>+ Add Lead</button>
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
              <th>Lead ID</th>
              <th>Customer</th>
              <th>Company</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Source</th>
              <th>Priority</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Created Date</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="11" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                  <FaSpinner className="fa-spin" style={{ fontSize: '24px', color: 'var(--primary)', marginBottom: '12px' }} />
                  <div style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Loading leads...</div>
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                {renderEmptyState()}
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id}>
                  <td className="lead-id">#{lead._id.substring(lead._id.length - 6).toUpperCase()}</td>
                  <td className="lead-customer">{lead.leadName}</td>
                  <td>{lead.companyName}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.email}</td>
                  <td>{lead.source}</td>
                  <td>
                    <span className={`badge ${getPriorityClass(lead.priority)}`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {lead.assignedUser ? (
                        <>
                          <div style={{ 
                            width: '28px', height: '28px', borderRadius: '50%', 
                            backgroundColor: 'var(--primary-light)', color: 'var(--primary)', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            fontSize: '12px', fontWeight: 'bold' 
                          }}>
                            {getInitials(lead.assignedUser.name || lead.assignedUser)}
                          </div>
                          <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                            {lead.assignedUser.name || lead.assignedUser}
                          </span>
                        </>
                      ) : (
                        <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Unassigned</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getStatusClass(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="created-date">{formatDate(lead.createdAt)}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <div className="table-pagination">
          <span className="pagination-info">
            Showing Page {pagination.currentPage} of {pagination.totalPages || 1} ({pagination.totalLeads} total entries)
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
