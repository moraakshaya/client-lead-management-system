import React from 'react';
import {
  FaUsers,
  FaUserPlus,
  FaUserCheck,
  FaHandshake,
  FaUserTimes,
  FaArrowUp,
  FaArrowDown,
  FaMinus
} from 'react-icons/fa';
import '../dashboard/StatsCards.css';

const renderTrendIcon = (type) => {
  if (type === 'positive') return <FaArrowUp />;
  if (type === 'negative') return <FaArrowDown />;
  return <FaMinus />;
};

export default function LeadsStatsCards({ stats, loading }) {
  const statsData = [
    {
      title: 'Total Active Leads',
      value: stats?.totalActiveLeads || 0,
      icon: <FaUsers />,
      color: 'var(--primary)',
      bg: 'rgba(139, 92, 246, 0.15)',
      trend: '+18%',
      trendType: 'positive',
      description: 'Pipeline Size'
    },
    {
      title: 'New Leads',
      value: stats?.newLeadsThisWeek || 0,
      icon: <FaUserPlus />,
      color: '#3B82F6',
      bg: 'rgba(59, 130, 246, 0.15)',
      trend: '+12%',
      trendType: 'positive',
      description: 'Inflow this week'
    },
    {
      title: 'Follow-ups Due',
      value: stats?.pendingFollowUps || 0,
      icon: <FaHandshake />,
      color: 'var(--warning)',
      bg: 'rgba(245, 158, 11, 0.15)',
      trend: '-5%',
      trendType: 'negative',
      description: 'Urgency'
    },
    {
      title: 'Conversion Rate',
      value: `${stats?.conversionRate || 0}%`,
      icon: <FaUserCheck />,
      color: 'var(--success)',
      bg: 'rgba(34, 197, 94, 0.15)',
      trend: '+24%',
      trendType: 'positive',
      description: 'Quality (Last 30 days)'
    }
  ];

  if (loading && !stats) {
    return <div style={{ color: 'var(--text-secondary)', padding: '20px' }}>Loading stats...</div>;
  }

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
