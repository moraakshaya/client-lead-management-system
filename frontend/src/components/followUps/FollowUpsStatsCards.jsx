import React from 'react';
import {
  FaCalendar,
  FaCalendarDay,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationCircle,
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

// We are now accepting the `stats` and `loading` variables as props!
export default function FollowUpsStatsCards({ stats, loading }) {

  // Notice that 'value' is now pulling from the database (e.g., stats?.today || 0)
  // We leave the 'trend' static for now since historical tracking isn't built yet.
  const statsData = [
    {
      title: 'Total',
      value: stats?.total || 0,
      icon: <FaCalendar />,
      color: 'var(--primary)',
      bg: 'rgba(139, 92, 246, 0.15)',
      trend: '+5%',
      trendType: 'positive',
      description: 'vs last week'
    },
    {
      title: 'Today',
      value: stats?.today || 0,
      icon: <FaCalendarDay />,
      color: 'var(--warning)',
      bg: 'rgba(245, 158, 11, 0.15)',
      trend: '+2',
      trendType: 'positive',
      description: 'since yesterday'
    },
    {
      title: 'Upcoming',
      value: stats?.upcoming || 0,
      icon: <FaCalendarAlt />,
      color: '#3B82F6',
      bg: 'rgba(59, 130, 246, 0.15)',
      trend: 'Steady',
      trendType: 'neutral',
      description: 'this week'
    },
    {
      title: 'Completed',
      value: stats?.completed || 0,
      icon: <FaCheckCircle />,
      color: 'var(--success)',
      bg: 'rgba(34, 197, 94, 0.15)',
      trend: '+15%',
      trendType: 'positive',
      description: 'vs last week'
    },
    {
      title: 'Overdue',
      value: stats?.overdue || 0,
      icon: <FaExclamationCircle />,
      color: 'var(--danger)',
      bg: 'rgba(239, 68, 68, 0.15)',
      trend: '-1',
      trendType: 'negative',
      description: 'needs action'
    },
  ];

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
              <span className="stat-value">
                {/* Show the stat value, keep it visible during searches */}
                {stat.value}
              </span>
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
