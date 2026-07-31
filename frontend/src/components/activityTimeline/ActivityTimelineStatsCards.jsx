import React from 'react';
import { useInfiniteCarousel } from '../../hooks/useInfiniteCarousel';
import {
  FaListUl,
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarAlt,
  FaCogs,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaStar
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
      trend: '+15%',
      trendType: 'positive',
      description: 'System Volume'
    },
    {
      title: 'Activities Today',
      value: stats?.todayActivities || 0,
      icon: <FaCalendarDay />,
      color: '#3B82F6',
      bg: 'rgba(59, 130, 246, 0.15)',
      trend: '+5',
      trendType: 'positive',
      description: 'Daily Heartbeat'
    },
    {
      title: 'Activities This Week',
      value: stats?.weeklyActivities || 0,
      icon: <FaCalendarWeek />,
      color: 'var(--success)',
      bg: 'rgba(34, 197, 94, 0.15)',
      trend: '+22%',
      trendType: 'positive',
      description: 'Weekly Momentum'
    },
    {
      title: 'Key Events',
      value: stats?.keyEvents || 0,
      icon: <FaStar />,
      color: 'var(--warning)',
      bg: 'rgba(245, 158, 11, 0.15)',
      trend: '+2',
      trendType: 'positive',
      description: 'High-Value Actions'
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
