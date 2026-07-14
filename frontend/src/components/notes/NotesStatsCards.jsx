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

const statsData = [
  {
    title: 'Total Notes',
    value: '156',
    icon: <FaStickyNote />,
    color: 'var(--primary)',
    bg: 'rgba(139, 92, 246, 0.15)',
    trend: '+12%',
    trendType: 'positive',
    description: 'vs last month'
  },
  {
    title: 'Lead Notes',
    value: '84',
    icon: <FaUserTie />,
    color: '#3B82F6',
    bg: 'rgba(59, 130, 246, 0.15)',
    trend: '+5',
    trendType: 'positive',
    description: 'this week'
  },
  {
    title: 'Client Notes',
    value: '72',
    icon: <FaUserCheck />,
    color: 'var(--success)',
    bg: 'rgba(34, 197, 94, 0.15)',
    trend: 'Steady',
    trendType: 'neutral',
    description: 'this week'
  },
  {
    title: 'Pinned Notes',
    value: '12',
    icon: <FaThumbtack />,
    color: 'var(--warning)',
    bg: 'rgba(245, 158, 11, 0.15)',
    trend: '0',
    trendType: 'neutral',
    description: 'important'
  }
];

const renderTrendIcon = (type) => {
  if (type === 'positive') return <FaArrowUp />;
  if (type === 'negative') return <FaArrowDown />;
  return <FaMinus />;
};

export default function NotesStatsCards() {
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
