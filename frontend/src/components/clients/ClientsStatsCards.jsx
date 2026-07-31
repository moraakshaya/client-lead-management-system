import React from 'react';
import { useInfiniteCarousel } from '../../hooks/useInfiniteCarousel';
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

export default function ClientsStatsCards({ stats, loading }) {
  const statsData = [
    {
      title: 'Total Active Clients',
      value: stats?.activeClients || 0,
      icon: <FaUserCheck />,
      color: 'var(--success)',
      bg: 'var(--success-bg)',
      trend: '+5%',
      trendType: 'positive',
      description: 'Portfolio Size'
    },
    {
      title: 'New Clients',
      value: stats?.newClients || 0,
      icon: <FaUserPlus />,
      color: '#3B82F6',
      bg: 'rgba(59, 130, 246, 0.15)',
      trend: '+15%',
      trendType: 'positive',
      description: 'Growth this month'
    },
    {
      title: 'VIP Clients',
      value: stats?.vipClients || 0,
      icon: <FaStar />,
      color: 'var(--warning)',
      bg: 'var(--warning-bg)',
      trend: '+2',
      trendType: 'positive',
      description: 'High Value'
    },
    {
      title: 'Inactive Clients',
      value: stats?.inactiveClients || 0,
      icon: <FaUserTimes />,
      color: 'var(--danger)',
      bg: 'var(--danger-bg)',
      trend: '-3%',
      trendType: 'negative',
      description: 'Churn / At-Risk'
    }
  ];

  const { scrollRef, paginationRef, handleScroll, scrollToCard } = useInfiniteCarousel(statsData.length);
  const carouselData = [...statsData, ...statsData, ...statsData];

  if (loading) {
    return <div style={{ color: 'var(--text-secondary)', padding: '20px' }}>Loading stats...</div>;
  }

  const renderTrendIcon = (type) => {
    if (type === 'positive') return <FaArrowUp />;
    if (type === 'negative') return <FaArrowDown />;
    return <FaMinus />;
  };

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
