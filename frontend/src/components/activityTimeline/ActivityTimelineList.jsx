import React, { useState } from 'react';
import './activityTimelineList.css';
import { 
  FaUserPlus, 
  FaUserEdit, 
  FaUserCheck, 
  FaUserCog, 
  FaCalendarPlus, 
  FaCalendarCheck, 
  FaStickyNote, 
  FaExchangeAlt, 
  FaTrashAlt, 
  FaSignInAlt,
  FaEllipsisV,
  FaEye,
  FaCopy
} from 'react-icons/fa';


export default function ActivityTimelineList({ data, loading, onAction, onRefresh, filters, setFilters }) {
  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <h2>Searching...</h2>
      </div>
    );
  }

  const hasSearch = !!filters?.search;
  const activeFiltersCount = Object.keys(filters || {}).filter(k => k !== 'search' && filters[k]).length;
  const hasFilters = activeFiltersCount > 0;

  if (!data || data.length === 0) {
    if (hasSearch && hasFilters) {
      return (
        <div className="empty-state-container" style={{ textAlign: 'center', padding: '5rem 2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginTop: '20px' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', opacity: 0.8 }}>🔍</div>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            No matching results found
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px', maxWidth: '400px', margin: '0 auto 24px auto' }}>
            No activities match your current search for <strong>"{filters.search}"</strong> and {activeFiltersCount} applied filter{activeFiltersCount > 1 ? 's' : ''}.
          </p>
          <button style={{ backgroundColor: 'transparent', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '600', transition: 'all 0.2s' }} onClick={() => setFilters({})}>Reset All Filters & Search</button>
        </div>
      );
    } else if (hasSearch) {
      return (
        <div className="empty-state-container" style={{ textAlign: 'center', padding: '5rem 2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginTop: '20px' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', opacity: 0.8 }}>🔍</div>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            Activity "{filters.search}" not found
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px' }}>
            We couldn't find any activities matching that search term.
          </p>
          <button style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '500', transition: 'all 0.2s' }} onClick={() => setFilters(prev => { const f = {...prev}; delete f.search; return f; })}>Clear Search</button>
        </div>
      );
    } else if (hasFilters) {
      return (
        <div className="empty-state-container" style={{ textAlign: 'center', padding: '5rem 2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginTop: '20px' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', opacity: 0.8 }}>🗂️</div>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            No activities match the selected filters
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px' }}>
            Try adjusting or removing some filters to see activities.
          </p>
          <button style={{ backgroundColor: 'transparent', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '600', transition: 'all 0.2s' }} onClick={() => setFilters({})}>Reset Filters</button>
        </div>
      );
    } else {
      return (
        <div className="empty-state-container" style={{ textAlign: 'center', padding: '5rem 2rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginTop: '20px' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>🕒</div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>No Activity Yet</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '16px' }}>All CRM activities will appear here.</p>
          <button className="btn-primary" onClick={onRefresh}>Refresh</button>
        </div>
      );
    }
  }

  return (
    <div className="timeline-list-wrapper">
      {data.map((group, groupIndex) => (
        <div key={groupIndex} className="timeline-date-group">
          
          <div className="timeline-date-header">
            <span className="date-badge">{group.date}</span>
          </div>

          <div className="timeline-items-container">
            {group.items.map((item, itemIndex) => (
              <div key={item.id} className="timeline-item">
                
                {/* Marker (Dot & Line) */}
                <div className="timeline-marker">
                  <div className={`timeline-dot type-${item.type}`}>
                  </div>
                  {/* Don't render line for the very last item in the entire list */}
                  {!(groupIndex === data.length - 1 && itemIndex === group.items.length - 1) && (
                    <div className="timeline-line"></div>
                  )}
                </div>

                {/* Content Card */}
                <div className="timeline-content-card">
                  <div className="timeline-card-header">
                    <div className="timeline-header-left">
                      <h3 className="timeline-title">{item.title}</h3>
                      <span className="timeline-author">By {item.createdBy || 'System'}</span>
                    </div>
                    
                    <div className="timeline-header-right">
                      <span className="timeline-time">{item.itemDate} &bull; {item.time}</span>
                    </div>

                    <div className="table-actions-dropdown timeline-actions">
                      <button className="action-menu-btn"><FaEllipsisV /></button>
                      <div className="dropdown-menu">
                        <button className="dropdown-item view-item" onClick={() => onAction && onAction('view', item)}>
                          <FaEye /> View Details
                        </button>
                        <button className="dropdown-item" style={{ color: 'var(--text-secondary)' }} onClick={() => onAction && onAction('copy', item)}>
                          <FaCopy /> Copy Activity
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="timeline-card-body">
                    <div className="timeline-entity-row">
                      <span className="timeline-entity">{item.entity}</span>
                      <span className="timeline-status-text">Status: {item.status}</span>
                    </div>
                    <span className="timeline-description">{item.description}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}
