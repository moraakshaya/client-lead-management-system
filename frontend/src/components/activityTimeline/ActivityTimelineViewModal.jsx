import React from 'react';
import { FaTimes, FaListUl } from 'react-icons/fa';
import '../clients/editClientModal.css';

export default function ActivityTimelineViewModal({ isOpen, onClose, activity }) {
  if (!isOpen || !activity) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaListUl style={{ marginRight: '10px' }} /> Activity Details</h2>
          <button className="close-btn" type="button" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="modal-content" style={{ padding: '32px 40px' }}>
          <div className="view-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

            <div className="view-item full-width" style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Activity</label>
              <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginTop: '4px' }}>{activity.title}</div>
            </div>

            <div className="view-item">
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Performed By</label>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>{activity.createdBy || 'System User'}</div>
            </div>

            <div className="view-item">
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Related Record</label>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>{activity.entity}</div>
            </div>

            <div className="view-item full-width" style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Module</label>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>{activity.module}</div>
            </div>

            <div className="view-item full-width" style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Description</label>
              <div style={{ fontSize: '15px', color: 'var(--text-primary)', marginTop: '4px', lineHeight: '1.5', background: 'var(--background)', padding: '16px', borderRadius: '8px' }}>
                {activity.description}
              </div>
            </div>

            <div className="view-item">
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</label>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>{activity.itemDate}</div>
            </div>

            <div className="view-item">
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Time</label>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '4px' }}>{activity.time}</div>
            </div>

          </div>
        </div>

        <div className="modal-footer edit-modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
