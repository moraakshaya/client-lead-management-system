import React from 'react';
import { 
  FaUsers, 
  FaUserCheck,
  FaStar,
  FaUserPlus,
  FaUserTimes,
  FaArrowUp,
  FaArrowDown,
  FaMinus
} from 'react-icons/fa';
import '../dashboard/StatsCards.css';

const statsData = [
  {
    title: 'Total Clients',
    value: '842',
    icon: <FaUsers />,
    color: 'var(--primary)',
    bg: 'var(--primary-light)',
    trend: '+12%',
    trendType: 'positive',
    description: 'vs last month'
  },
  {
    title: 'Active Clients',
    value: '620',
    icon: <FaUserCheck />,
    color: 'var(--success)',
    bg: 'var(--success-bg)',
    trend: '+5%',
    trendType: 'positive',
    description: 'currently active'
  },
  {
    title: 'VIP Clients',
    value: '45',
    icon: <FaStar />,
    color: 'var(--warning)',
    bg: 'var(--warning-bg)',
    trend: '+2',
    trendType: 'positive',
    description: 'this month'
  },
  {
    title: 'New This Month',
    value: '28',
    icon: <FaUserPlus />,
    color: '#3B82F6',
    bg: 'rgba(59, 130, 246, 0.15)',
    trend: '+15%',
    trendType: 'positive',
    description: 'compared to avg'
  },
  {
    title: 'Inactive',
    value: '177',
    icon: <FaUserTimes />,
    color: 'var(--danger)',
    bg: 'var(--danger-bg)',
    trend: '-3%',
    trendType: 'negative',
    description: 'needs attention'
  },
];

const renderTrendIcon = (type) => {
  if (type === 'positive') return <FaArrowUp />;
  if (type === 'negative') return <FaArrowDown />;
  return <FaMinus />;
};

export default function ClientsStatsCards() {
  return (
    <div className="stats-container">
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
            
            <div className="glass-reflection"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
