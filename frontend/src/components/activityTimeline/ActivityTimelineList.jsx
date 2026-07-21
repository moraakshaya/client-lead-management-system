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


export default function ActivityTimelineList({ data, loading, onAction, onRefresh }) {
  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <h2>Searching...</h2>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="empty-state-container" style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginTop: '20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🕒</div>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '18px' }}>No Activity Yet</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>All CRM activities will appear here.</p>
        <button className="btn-primary" onClick={onRefresh}>Refresh</button>
      </div>
    );
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
                      <span className="timeline-module-badge">{item.module}</span>
                    </div>
                    <div className="timeline-header-right">
                      <span className="timeline-time">{item.itemDate} &bull; {item.time}</span>
                      
                      <div className="table-actions-dropdown" style={{ marginLeft: '12px' }}>
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
