import React from 'react';
import {
  FaListUl,
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarAlt,
  FaCogs,
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

// NEW: Accept the stats and loading props from the main page
export default function ActivityTimelineStatsCards({ stats, loading }) {

  // NEW: Use the real live stats from the database (e.g., stats?.todayActivities)
  const statsData = [
    {
      title: 'Total Activities',
      value: stats?.totalActivities || 0,
      icon: <FaListUl />,
      color: 'var(--primary)',
      bg: 'rgba(139, 92, 246, 0.15)',
      trend: '+12%',
      trendType: 'positive',
      description: 'all time'
    },
    {
      title: "Today's Activities",
      value: stats?.todayActivities || 0,
      icon: <FaCalendarDay />,
      color: '#3B82F6',
      bg: 'rgba(59, 130, 246, 0.15)',
      trend: '+5',
      trendType: 'positive',
      description: 'vs yesterday'
    },
    {
      title: 'Weekly Activities',
      value: stats?.weeklyActivities || 0,
      icon: <FaCalendarWeek />,
      color: 'var(--success)',
      bg: 'rgba(34, 197, 94, 0.15)',
      trend: 'Steady',
      trendType: 'neutral',
      description: 'this week'
    },
    {
      title: 'Monthly Activities',
      value: stats?.monthlyActivities || 0,
      icon: <FaCalendarAlt />,
      color: 'var(--warning)',
      bg: 'rgba(245, 158, 11, 0.15)',
      trend: '-2%',
      trendType: 'negative',
      description: 'vs last month'
    },
    {
      title: 'System Activities',
      value: stats?.systemActivities || 0,
      icon: <FaCogs />,
      color: 'var(--text-secondary)',
      bg: 'rgba(100, 116, 139, 0.15)',
      trend: '0',
      trendType: 'neutral',
      description: 'automated logs'
    }
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
