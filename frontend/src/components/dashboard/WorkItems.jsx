import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiCalendar } from 'react-icons/hi';
import './WorkItems.css';

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
};

const formatFollowUpDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  let relativeDay = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  
  if (date.toDateString() === today.toDateString()) {
    relativeDay = 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    relativeDay = 'Tomorrow';
  }

  return { time, relativeDay };
};

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
    createdAt: lead.createdAt || new Date(),
    source: lead.source || 'Direct'
  })) || [];

  const followUps = recentWork?.upcomingFollowUps?.map((task, i) => {
    const { time, relativeDay } = formatFollowUpDate(task.followUpDate);
    return {
      id: task._id || i,
      task: task.followUpType + ' follow-up',
      contact: task.leadId?.leadName || task.leadId?.companyName || 'Unknown Contact',
      time,
      relativeDay
    };
  }) || [];

  return (
    <div className="work-items-section">
      {/* Recent Leads */}
      <div className="work-card stat-glass-card recent-leads-analytics">
        <div className="work-card-header">
          <h2 className="work-card-title">Recent Leads</h2>
          <button className="view-all-link" onClick={() => navigate('/leads')}>View all</button>
        </div>

        <div className="recent-leads-list">
          {recentLeads.map(lead => (
            <div key={lead.id} className="recent-lead-item">
              <div className="recent-lead-info">
                <div className="recent-lead-avatar">
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <div className="recent-lead-text">
                  <span className="recent-lead-name">{lead.name}</span>
                  <span className="recent-lead-source">{lead.source}</span>
                </div>
              </div>
              <div className="recent-lead-meta">
                <span className="recent-lead-badge">{lead.status}</span>
                <span className="recent-lead-time">{timeAgo(lead.createdAt)}</span>
              </div>
            </div>
          ))}
          {recentLeads.length === 0 && (
            <div className="empty-state">No recent leads found.</div>
          )}
        </div>
      </div>
      
      {/* Upcoming Follow-Ups */}
      <div className="work-card stat-glass-card">
        <div className="work-card-header">
          <h2 className="work-card-title">Upcoming Follow-Ups</h2>
          <button className="view-all-link" onClick={() => navigate('/follow-ups')}>View all</button>
        </div>
        <div className="followup-list">
          {followUps.map(task => (
            <div key={task.id} className="followup-item">
              <div className="followup-info">
                <div className="followup-icon-wrapper">
                  <HiCalendar className="followup-icon" />
                </div>
                <div className="followup-text">
                  <span className="followup-title">{task.task}</span>
                  <span className="followup-contact">{task.contact}</span>
                </div>
              </div>
              <div className="followup-meta">
                <span className="followup-time">{task.time}</span>
                <span className={`followup-badge badge-${task.relativeDay.toLowerCase().replace(' ', '-')}`}>
                  {task.relativeDay}
                </span>
              </div>
            </div>
          ))}
          {followUps.length === 0 && (
             <div className="empty-state">No upcoming follow-ups.</div>
          )}
        </div>
      </div>


    </div>
  );
}
