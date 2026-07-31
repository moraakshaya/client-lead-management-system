import React from 'react';
import { useInfiniteCarousel } from '../../hooks/useInfiniteCarousel';
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
      title: 'Due Today',
      value: stats?.today || 0,
      icon: <FaCalendarDay />,
      color: 'var(--warning)',
      bg: 'rgba(245, 158, 11, 0.15)',
      trend: '+2',
      trendType: 'positive',
      description: 'Daily Goal'
    },
    {
      title: 'Overdue',
      value: stats?.overdue || 0,
      icon: <FaExclamationCircle />,
      color: 'var(--danger)',
      bg: 'rgba(239, 68, 68, 0.15)',
      trend: '-1',
      trendType: 'negative',
      description: 'Immediate Action Required'
    },
    {
      title: 'Upcoming This Week',
      value: stats?.upcoming || 0,
      icon: <FaCalendarAlt />,
      color: '#3B82F6',
      bg: 'rgba(59, 130, 246, 0.15)',
      trend: '+5%',
      trendType: 'positive',
      description: 'Pipeline Visibility'
    },
    {
      title: 'Completed Today',
      value: stats?.completed || 0,
      icon: <FaCheckCircle />,
      color: 'var(--success)',
      bg: 'rgba(34, 197, 94, 0.15)',
      trend: '+15%',
      trendType: 'positive',
      description: 'Momentum'
    }
  ];

  const { scrollRef, paginationRef, handleScroll, scrollToCard } = useInfiniteCarousel(statsData.length);
  const carouselData = [...statsData, ...statsData, ...statsData];

  return (
    <div className="stats-container">
      <div className="glass-blob glass-blob-1"></div>
      <div className="glass-blob glass-blob-2"></div>
      <div className="glass-blob glass-blob-3"></div>

      <div className="stats-grid" ref={scrollRef} onScroll={handleScroll}>
        {carouselData.map((stat, index) => (
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

      <div className="stats-pagination" ref={paginationRef}>
        {statsData.map((_, index) => (
          <button 
            key={index} 
            className={`pagination-dot ${index === 0 ? 'active' : ''}`}
            onClick={() => scrollToCard(index)}
            aria-label={`Go to stat card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
