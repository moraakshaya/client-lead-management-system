import React from 'react';
import './Operations.css';

import { 
  HiUser, 
  HiStar, 
  HiCheckCircle, 
  HiDocumentText,
  HiUserAdd,
  HiCalendar,
  HiMail,
  HiChartBar
} from 'react-icons/hi';

const activities = [
  { id: 1, type: 'Lead Created', title: 'New lead from Website form', user: 'System', time: '10 mins ago', icon: <HiUser />, color: 'var(--primary)' },
  { id: 2, type: 'Client Converted', title: 'Alice Smith upgraded to Premium', user: 'Sarah K.', time: '2 hours ago', icon: <HiStar />, color: 'var(--success)' },
  { id: 3, type: 'Follow-up Completed', title: 'Call with Bob Jones', user: 'Mike T.', time: '5 hours ago', icon: <HiCheckCircle />, color: '#3b82f6' },
  { id: 4, type: 'Note Added', title: 'Left a voicemail regarding pricing', user: 'Mike T.', time: '1 day ago', icon: <HiDocumentText />, color: 'var(--warning)' },
];

const quickActions = [
  { id: 1, label: 'Add New Lead', icon: <HiUserAdd />, color: 'var(--primary)', desc: 'Manually input a new lead' },
  { id: 2, label: 'Create Follow-Up', icon: <HiCalendar />, color: 'var(--warning)', desc: 'Schedule a task or meeting' },
  { id: 3, label: 'Send Email Blast', icon: <HiMail />, color: 'var(--success)', desc: 'Draft an email campaign' },
  { id: 4, label: 'View Reports', icon: <HiChartBar />, color: '#8b5cf6', desc: 'Detailed analytics and export' },
];

export default function Operations() {
  return (
    <div className="operations-section">
      {/* Activity Timeline */}
      <div className="ops-card stat-glass-card timeline-card">
        <div className="ops-card-header">
          <h2 className="ops-card-title">Activity Timeline</h2>
          <button className="view-all-btn">History</button>
        </div>
        
        <div className="timeline-container">
          {activities.map((activity, index) => (
            <div key={activity.id} className="timeline-item">
              {/* Vertical line connecting dots */}
              {index !== activities.length - 1 && <div className="timeline-line"></div>}
              
              <div className="timeline-icon-wrapper" style={{ backgroundColor: `${activity.color}20`, border: `1px solid ${activity.color}50` }}>
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
            <button key={action.id} className="quick-action-btn">
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
