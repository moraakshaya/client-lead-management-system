import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkItems.css';

const getStatusColor = (status) => {
  switch(status) {
    case 'New': return 'var(--primary)';
    case 'Contacted': return 'var(--info, #3b82f6)';
    case 'Pending': return 'var(--warning)';
    case 'Converted': return 'var(--success)';
    case 'Qualified': return 'var(--success)';
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

export default function WorkItems({ recentWork }) {
  const navigate = useNavigate();
  
  const recentLeads = recentWork?.recentLeads?.map((lead, i) => ({
    id: lead._id || i,
    name: lead.leadName || lead.companyName || 'Unknown Lead',
    status: lead.status || 'New',
    date: new Date(lead.createdAt).toLocaleDateString(),
    source: lead.source || 'Direct'
  })) || [];

  const followUps = recentWork?.upcomingFollowUps?.map((task, i) => ({
    id: task._id || i,
    task: task.followUpType + ' follow-up',
    contact: task.leadId?.leadName || task.leadId?.companyName || 'Unknown Contact',
    due: new Date(task.followUpDate).toLocaleDateString(),
    priority: 'Medium'
  })) || [];

  return (
    <div className="work-items-section">
      {/* Recent Leads */}
      <div className="work-card stat-glass-card">
        <div className="work-card-header">
          <h2 className="work-card-title">Recent Leads</h2>
          <button className="view-all-btn" onClick={() => navigate('/leads')}>View All</button>
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
          <button className="view-all-btn" onClick={() => navigate('/follow-ups')}>View All</button>
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
