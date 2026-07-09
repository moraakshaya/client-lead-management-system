import React from 'react';
import './WorkItems.css';

const recentLeads = [
  { id: 1, name: 'Alice Smith', status: 'New', date: '2 hours ago', source: 'Website' },
  { id: 2, name: 'Bob Jones', status: 'Contacted', date: '5 hours ago', source: 'Referral' },
  { id: 3, name: 'Charlie Davis', status: 'Pending', date: '1 day ago', source: 'Instagram' },
  { id: 4, name: 'Diana Prince', status: 'Converted', date: '2 days ago', source: 'Facebook' },
];

const followUps = [
  { id: 1, task: 'Call regarding proposal', contact: 'Alice Smith', due: 'Today, 2:00 PM', priority: 'High' },
  { id: 2, task: 'Email pricing sheet', contact: 'Bob Jones', due: 'Tomorrow, 10:00 AM', priority: 'Medium' },
  { id: 3, task: 'Follow up on demo', contact: 'Charlie Davis', due: 'Jul 15, 2026', priority: 'Low' },
];

const getStatusColor = (status) => {
  switch(status) {
    case 'New': return 'var(--primary)';
    case 'Contacted': return 'var(--info, #3b82f6)';
    case 'Pending': return 'var(--warning)';
    case 'Converted': return 'var(--success)';
    default: return 'var(--text-secondary)';
  }
};

const getPriorityColor = (priority) => {
  switch(priority) {
    case 'High': return 'var(--danger)';
    case 'Medium': return 'var(--warning)';
    case 'Low': return 'var(--success)';
    default: return 'var(--text-secondary)';
  }
};

export default function WorkItems() {
  return (
    <div className="work-items-section">
      {/* Recent Leads */}
      <div className="work-card stat-glass-card">
        <div className="work-card-header">
          <h2 className="work-card-title">Recent Leads</h2>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="work-list">
          {recentLeads.map(lead => (
            <div key={lead.id} className="work-list-item">
              <div className="item-details">
                <span className="item-primary-text">{lead.name}</span>
                <span className="item-secondary-text">{lead.source} • {lead.date}</span>
              </div>
              <div className="item-badge" style={{ backgroundColor: `${getStatusColor(lead.status)}20`, color: getStatusColor(lead.status) }}>
                {lead.status}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Upcoming Follow-Ups */}
      <div className="work-card stat-glass-card">
        <div className="work-card-header">
          <h2 className="work-card-title">Upcoming Follow-Ups</h2>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="work-list">
          {followUps.map(task => (
            <div key={task.id} className="work-list-item">
              <div className="item-details">
                <span className="item-primary-text">{task.task}</span>
                <span className="item-secondary-text">{task.contact} • {task.due}</span>
              </div>
              <div className="priority-indicator" style={{ backgroundColor: getPriorityColor(task.priority) }} title={`${task.priority} Priority`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
