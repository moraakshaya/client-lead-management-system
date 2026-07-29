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
      value: stats?.leads?.value || 0,
      icon: <FaUsers />,
      color: 'var(--primary)',
      bg: 'rgba(139, 92, 246, 0.15)',
      trend: stats?.leads?.trend || '0%',
      trendType: stats?.leads?.trendType || 'neutral',
      description: 'from last month'
    },
    {
      title: 'Total Clients',
      value: stats?.clients?.value || 0,
      icon: <FaHandshake />,
      color: 'var(--success)',
      bg: 'rgba(34, 197, 94, 0.15)',
      trend: stats?.clients?.trend || '0%',
      trendType: stats?.clients?.trendType || 'neutral',
      description: 'from last month'
    },
    {
      title: 'Converted to Clients',
      value: stats?.converted?.value || 0,
      icon: <FaCheckCircle />,
      color: '#10B981',
      bg: 'rgba(16, 185, 129, 0.15)',
      trend: stats?.converted?.trend || '0%',
      trendType: stats?.converted?.trendType || 'neutral',
      description: 'from last month'
    },
    {
      title: 'Follow Ups Today',
      value: stats?.followups?.value || 0,
      icon: <FaClock />,
      color: '#3B82F6',
      bg: 'rgba(59, 130, 246, 0.15)',
      trend: stats?.followups?.trend || '0%',
      trendType: stats?.followups?.trendType || 'neutral',
      description: 'from yesterday'
    }
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
