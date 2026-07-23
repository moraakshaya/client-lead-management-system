import React, { useState, useEffect } from 'react';
import { FaTimes, FaUser, FaStickyNote, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import './viewClientModal.css';
import { getNotes } from '../../services/noteService';
import { getFollowUps } from '../../services/followUpService';
import { handleApiError } from '../../utils/errorHandler';

export default function ViewClientModal({ isOpen, onClose, client }) {
  const [notes, setNotes] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && client) {
      const fetchData = async () => {
        setLoading(true);
        try {
          // Fetch notes and follow-ups concurrently
          const [notesRes, followUpsRes] = await Promise.all([
            getNotes({ leadId: client._id, limit: 5 }),
            getFollowUps({ leadId: client._id, limit: 5 })
          ]);
          setNotes(notesRes.data?.notes || []);
          setFollowUps(followUpsRes.data?.followUps || []);
        } catch (error) {
          handleApiError(error, 'fetchClientDetails');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [isOpen, client]);

  if (!isOpen || !client) return null;

  // Use actual client data
  const clientData = {
    client: client.clientName || client.customer || client.client || 'Unknown',
    company: client.companyName || client.company || 'N/A',
    email: client.email || 'No email provided',
    phone: client.phone || 'No phone provided',
    status: client.status || 'Active',
    priority: client.priority || 'Standard',
    since: new Date(client.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaUser style={{ marginRight: '10px' }}/> Client Details</h2>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="modal-content">
          {/* Basic Information */}
          <div className="modal-section">
            <h3 className="section-title"><span className="icon-wrapper"><FaUser /></span> Basic Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Client Name</span>
                <span className="info-value">{clientData.client}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Company</span>
                <span className="info-value">{clientData.company}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{clientData.email || 'john@example.com'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone</span>
                <span className="info-value">{clientData.phone || '+91 9876543210'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className="info-value">
                  <span className={`status-badge ${clientData.status?.toLowerCase() === 'active' || clientData.status?.toLowerCase() === 'vip' ? 'status-active' : ''}`}>
                    {clientData.status}
                  </span>
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Priority</span>
                <span className="info-value">
                  <span className={`status-badge ${clientData.priority?.toLowerCase() === 'vip' ? 'status-active' : ''}`}>
                    {clientData.priority}
                  </span>
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Client Since</span>
                <span className="info-value">{clientData.since}</span>
              </div>
            </div>
          </div>

          <hr className="section-divider" />

          {/* Recent Notes */}
          <div className="modal-section">
            <h3 className="section-title"><span className="icon-wrapper"><FaStickyNote /></span> Recent Notes</h3>
            {loading ? (
              <p style={{ color: 'var(--text-secondary)' }}>Loading notes...</p>
            ) : notes.length > 0 ? (
              <ul className="notes-list">
                {notes.map(note => (
                  <li key={note._id}>
                    <strong>{note.title}</strong>: {note.notes}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>No recent notes for this client.</p>
            )}
          </div>

          <hr className="section-divider" />

          {/* Upcoming Follow-up */}
          <div className="modal-section">
            <h3 className="section-title"><span className="icon-wrapper"><FaCalendarAlt /></span> Upcoming Follow-ups</h3>
            {loading ? (
              <p style={{ color: 'var(--text-secondary)' }}>Loading follow-ups...</p>
            ) : followUps.length > 0 ? (
              followUps.map(fu => (
                <div className="followup-box" key={fu._id} style={{ marginBottom: '12px' }}>
                  <div className="followup-date">
                    {new Date(fu.followUpDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} at {new Date(fu.followUpDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                  <div className="followup-desc">{fu.followUpType} - {fu.status}</div>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>No upcoming follow-ups scheduled.</p>
            )}
          </div>

          <hr className="section-divider" />

          {/* Recent Activity */}
          <div className="modal-section">
            <h3 className="section-title"><span className="icon-wrapper"><FaChartLine /></span> Recent Activity</h3>
            <ul className="activity-list">
              <li><span className="check-icon">✓</span> Client Created</li>
              <li><span className="check-icon">✓</span> Note Added</li>
              <li><span className="check-icon">✓</span> Follow-up Scheduled</li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
