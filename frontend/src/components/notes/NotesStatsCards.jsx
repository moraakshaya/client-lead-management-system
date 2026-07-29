import React from 'react';
import {
  FaStickyNote,
  FaUserTie,
  FaUserCheck,
  FaThumbtack,
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
export default function NotesStatsCards({ stats, loading }) {

  // NEW: Use the real live stats from the database (e.g., stats?.totalNotes)
  const statsData = [
    {
      title: 'Total Notes',
      value: stats?.totalNotes || 0,
      icon: <FaStickyNote />,
      color: 'var(--primary)',
      bg: 'rgba(139, 92, 246, 0.15)',
      trend: '+12%',
      trendType: 'positive',
      description: 'Documented interactions'
    },
    {
      title: 'Notes Today',
      value: stats?.notesToday || 0,
      icon: <FaUserTie />,
      color: '#3B82F6',
      bg: 'rgba(59, 130, 246, 0.15)',
      trend: '+5',
      trendType: 'positive',
      description: 'Daily engagement'
    },
    {
      title: 'Pinned Notes',
      value: stats?.pinnedNotes || 0,
      icon: <FaThumbtack />,
      color: 'var(--warning)',
      bg: 'rgba(245, 158, 11, 0.15)',
      trend: '0',
      trendType: 'neutral',
      description: 'High priority info'
    },
    {
      title: 'Leads with Notes',
      value: stats?.leadsWithNotes || 0,
      icon: <FaUserCheck />,
      color: 'var(--success)',
      bg: 'rgba(34, 197, 94, 0.15)',
      trend: '+3',
      trendType: 'positive',
      description: 'Documentation coverage'
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
