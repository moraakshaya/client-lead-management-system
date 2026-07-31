import React from 'react';
import { useInfiniteCarousel } from '../../hooks/useInfiniteCarousel';
import {
  FaUsers,
  FaHandshake,
  FaCalendarCheck,
  FaFire,
  FaClock,
  FaCheckCircle,
  FaChartLine,
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
  const leadsCount = stats?.leads?.value || 0;
  const clientsCount = stats?.clients?.value || 0;
  const conversionRate = leadsCount > 0 
    ? `${((clientsCount / leadsCount) * 100).toFixed(1)}%` 
    : '0.0%';

  const baseStatsData = [
    {
      title: 'Total Leads',
      value: leadsCount,
      icon: <FaUsers />,
      color: 'var(--primary)',
      bg: 'rgba(139, 92, 246, 0.15)',
      trend: stats?.leads?.trend || '0%',
      trendType: stats?.leads?.trendType || 'neutral',
      description: 'from last month'
    },
    {
      title: 'Total Clients',
      value: clientsCount,
      icon: <FaHandshake />,
      color: 'var(--success)',
      bg: 'rgba(34, 197, 94, 0.15)',
      trend: stats?.clients?.trend || '0%',
      trendType: stats?.clients?.trendType || 'neutral',
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
    },
    {
      title: 'Lead Conversion Rate',
      value: conversionRate,
      icon: <FaChartLine />,
      color: '#10B981',
      bg: 'rgba(16, 185, 129, 0.15)',
      trend: stats?.converted?.trend || '0%',
      trendType: stats?.converted?.trendType || 'positive',
      description: 'of total leads converted'
    }
  ];

  const { scrollRef, paginationRef, handleScroll, scrollToCard } = useInfiniteCarousel(baseStatsData.length);
  const statsData = [...baseStatsData, ...baseStatsData, ...baseStatsData];

  return (
    <div className="stats-container">
      <div className="glass-blob glass-blob-1"></div>
      <div className="glass-blob glass-blob-2"></div>
      <div className="glass-blob glass-blob-3"></div>

      <div className="stats-grid" ref={scrollRef} onScroll={handleScroll}>
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

      <div className="stats-pagination" ref={paginationRef}>
        {baseStatsData.map((_, index) => (
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
