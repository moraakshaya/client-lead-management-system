import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Operations.css';

import { 
  HiUser, 
  HiStar, 
  HiCheckCircle, 
  HiDocumentText,
  HiUserAdd,
  HiCalendar,
  HiMail,
  HiChartBar,
  HiOfficeBuilding
} from 'react-icons/hi';

const quickActions = [
  { id: 1, label: 'Add New Lead', icon: <HiUserAdd />, color: 'var(--primary)', desc: 'Manually input a new lead', action: 'addLead' },
  { id: 2, label: 'Create Follow-Up', icon: <HiCalendar />, color: 'var(--warning)', desc: 'Schedule a call, meeting or reminder.', action: 'addFollowUp' },
  { id: 3, label: 'View Leads', icon: <HiUser />, color: 'var(--info)', desc: 'View and manage your leads pipeline.', path: '/leads' },
  { id: 4, label: 'View Clients', icon: <HiOfficeBuilding />, color: 'var(--success)', desc: 'Manage your active client records.', path: '/clients' },
];

export default function Operations({ activities, onAddLead, onCreateFollowUp }) {
  const navigate = useNavigate();

  const timelineActivities = activities?.map((activity, index) => ({
    id: activity._id || index,
    type: activity.action || 'Action',
    title: activity.description || 'No description',
    user: activity.createdBy || 'System',
    time: new Date(activity.createdAt).toLocaleDateString(),
    icon: <HiDocumentText />, 
    color: 'var(--primary)'
  })) || [];

  return (
    <div className="operations-section">
      {/* Activity Timeline */}
      <div className="ops-card stat-glass-card timeline-card">
        <div className="ops-card-header">
          <h2 className="ops-card-title">Activity Timeline</h2>
          <button className="view-all-btn" onClick={() => navigate('/activity-timeline')}>History</button>
        </div>
        
        <div className="timeline-container">
          {timelineActivities.map((activity, index) => (
            <div key={activity.id} className="timeline-item">
              {/* Vertical line connecting dots */}
              {index !== timelineActivities.length - 1 && <div className="ops-timeline-line"></div>}
              
              <div className="timeline-icon-wrapper">
                <span className="timeline-icon">{activity.icon}</span>
              </div>
              
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-type" style={{ color: activity.color }}>{activity.type}</span>
                  <span className="timeline-time">{activity.time}</span>
                </div>
                <p className="timeline-title">{activity.title}</p>
                <span className="timeline-user">By {activity.user}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="ops-card stat-glass-card actions-card">
        <div className="ops-card-header">
          <h2 className="ops-card-title">Quick Actions</h2>
        </div>
        
        <div className="actions-grid">
          {quickActions.map(action => (
            <button 
              key={action.id} 
              className="quick-action-btn" 
              onClick={() => {
                if (action.action === 'addLead' && onAddLead) {
                  onAddLead();
                } else if (action.action === 'addFollowUp' && onCreateFollowUp) {
                  onCreateFollowUp();
                } else if (action.path) {
                  navigate(action.path);
                }
              }}
            >
              <div className="action-icon-wrapper" style={{ backgroundColor: `${action.color}15`, color: action.color }}>
                <span className="action-icon">{action.icon}</span>
              </div>
              <div className="action-text">
                <span className="action-label">{action.label}</span>
                <span className="action-desc">{action.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
