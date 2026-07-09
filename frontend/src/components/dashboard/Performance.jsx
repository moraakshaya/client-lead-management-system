import React from 'react';
import './Performance.css';
import { HiCurrencyDollar, HiTrendingUp, HiCheckCircle, HiStar } from 'react-icons/hi';

const metrics = [
  { id: 1, label: 'Monthly Revenue', value: '$42,500', trend: '+15%', trendType: 'positive', icon: <HiCurrencyDollar />, color: 'var(--success)' },
  { id: 2, label: 'Conversion Rate', value: '24.8%', trend: '+2.1%', trendType: 'positive', icon: <HiTrendingUp />, color: 'var(--primary)' },
  { id: 3, label: 'Target Achievement', value: '92%', trend: '-8%', trendType: 'negative', icon: <HiCheckCircle />, color: 'var(--warning)' },
  { id: 4, label: 'Top Executive', value: 'Sarah K.', trend: '42 Leads', trendType: 'neutral', icon: <HiStar />, color: '#8b5cf6' },
];

const funnelData = [
  { stage: 'Total Visitors', count: 5400, percentage: 100, color: 'var(--primary)' },
  { stage: 'Leads Captured', count: 1190, percentage: 22, color: 'var(--info, #3b82f6)' },
  { stage: 'Qualified Leads', count: 420, percentage: 8, color: 'var(--warning)' },
  { stage: 'Clients Converted', count: 84, percentage: 1.5, color: 'var(--success)' },
];

export default function Performance() {
  return (
    <div className="performance-section">
      {/* Key Metrics */}
      <div className="perf-card stat-glass-card metrics-card">
        <div className="perf-card-header">
          <h2 className="perf-card-title">Performance Overview</h2>
        </div>
        
        <div className="perf-metrics-grid">
          {metrics.map(metric => (
            <div key={metric.id} className="perf-metric-box">
              <div className="perf-metric-header">
                <span className="perf-metric-label">{metric.label}</span>
                <div 
                  className={`perf-icon-3d icon-${metric.id}`} 
                  style={{ backgroundColor: `color-mix(in srgb, ${metric.color} 15%, transparent)`, color: metric.color }}
                >
                  <span className="perf-metric-icon">{metric.icon}</span>
                </div>
              </div>
              <div className="perf-metric-value">{metric.value}</div>
              <div className={`perf-metric-trend trend-${metric.trendType}`}>
                {metric.trend}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Funnel */}
      <div className="perf-card stat-glass-card funnel-card">
        <div className="perf-card-header">
          <h2 className="perf-card-title">Lead Funnel</h2>
        </div>
        
        <div className="funnel-container">
          {funnelData.map((item, index) => (
            <div key={index} className="funnel-stage-wrapper">
              <div className="funnel-stage-info">
                <span className="funnel-stage-name">{item.stage}</span>
                <div className="funnel-stage-stats">
                  <span className="funnel-stage-count">{item.count}</span>
                  <span className="funnel-percentage-text">{item.percentage}%</span>
                </div>
              </div>
              <div className="funnel-bar-bg">
                <div 
                  className="funnel-bar-fill" 
                  style={{ 
                    width: `${(item.count / funnelData[0].count) * 100}%`,
                    backgroundColor: item.color,
                    boxShadow: `0 0 12px ${item.color}80`
                  }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
