import React from 'react';
import { 
  FaUsers, 
  FaHandshake, 
  FaCalendarCheck, 
  FaFire, 
  FaClock, 
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
  FaMinus
} from 'react-icons/fa';
import './StatsCards.css';

const renderTrendIcon = (type) => {
  if (type === 'positive') return <FaArrowUp />;
  if (type === 'negative') return <FaArrowDown />;
  return <FaMinus />;
};

export default function StatsCards({ stats }) {
  const statsData = [
    {
      title: 'Total Leads',
      value: stats?.totalLeads || 0,
      icon: <FaUsers />,
      color: 'var(--primary)',
      bg: 'rgba(139, 92, 246, 0.15)',
      trend: '+18%',
      trendType: 'positive',
      description: 'vs last week'
    },
    {
      title: 'Clients',
      value: stats?.totalClients || 0,
      icon: <FaHandshake />,
      color: 'var(--success)',
      bg: 'rgba(34, 197, 94, 0.15)',
      trend: '+5%',
      trendType: 'positive',
      description: 'vs last month'
    },
    {
      title: 'Follow Ups',
      value: stats?.totalFollowUps || 0,
      icon: <FaCalendarCheck />,
      color: 'var(--warning)',
      bg: 'rgba(245, 158, 11, 0.15)',
      trend: '0%',
      trendType: 'neutral',
      description: 'total'
    },
    {
      title: 'Hot Leads',
      value: stats?.hotLeads || 0,
      icon: <FaFire />,
      color: 'var(--danger)',
      bg: 'rgba(239, 68, 68, 0.15)',
      trend: '+24%',
      trendType: 'positive',
      description: 'qualified leads'
    },
    {
      title: 'Pending',
      value: stats?.pendingFollowUps || 0,
      icon: <FaClock />,
      color: '#3B82F6', 
      bg: 'rgba(59, 130, 246, 0.15)',
      trend: '-12%',
      trendType: 'negative',
      description: 'follow ups'
    },
    {
      title: 'Closed Deals',
      value: stats?.wonLeads || 0,
      icon: <FaCheckCircle />,
      color: '#10B981', 
      bg: 'rgba(16, 185, 129, 0.15)',
      trend: '+12%',
      trendType: 'positive',
      description: 'won leads'
    },
  ];

  return (
    <div className="stats-container">
      {/* Background glowing orbs to make the glassmorphism visible */}
      <div className="glass-blob glass-blob-1"></div>
      <div className="glass-blob glass-blob-2"></div>
      <div className="glass-blob glass-blob-3"></div>

      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-glass-card">
            
            <div className="stat-card-header">
              <div 
                className="stat-icon-wrapper-3d"
                style={{ 
                  color: stat.color, 
                  backgroundColor: stat.bg 
                }}
              >
                {stat.icon}
              </div>
              
              <div className={`stat-trend-glass trend-${stat.trendType}`}>
                <span className="trend-icon">{renderTrendIcon(stat.trendType)}</span>
                {stat.trend}
              </div>
            </div>

            <div className="stat-card-body">
              <span className="stat-label">{stat.title}</span>
              <span className="stat-value">{stat.value}</span>
            </div>

            <div className="stat-card-footer">
              <span className="stat-description">{stat.description}</span>
            </div>
            
            {/* 3D Glass Light Reflection */}
            <div className="glass-reflection"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
