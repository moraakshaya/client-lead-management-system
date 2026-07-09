import React, { useState, useRef, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import './LeadAnalytics.css';

const data = [
  { name: 'Jan', leads: 50, converted: 10, pending: 35, lost: 5 },
  { name: 'Feb', leads: 80, converted: 20, pending: 50, lost: 10 },
  { name: 'Mar', leads: 130, converted: 40, pending: 80, lost: 10 },
  { name: 'Apr', leads: 160, converted: 60, pending: 85, lost: 15 },
  { name: 'May', leads: 210, converted: 90, pending: 100, lost: 20 },
  { name: 'Jun', leads: 250, converted: 120, pending: 110, lost: 20 },
  { name: 'Jul', leads: 310, converted: 150, pending: 135, lost: 25 },
];

const metricConfigs = {
  all: { label: 'All Metrics', color: 'var(--text-primary)' },
  leads: { label: 'Total Leads', color: 'var(--primary)' },
  converted: { label: 'Converted', color: 'var(--success)' },
  pending: { label: 'Pending', color: 'var(--warning)' },
  lost: { label: 'Lost', color: 'var(--danger)' }
};

const leadSources = [
  { name: 'Website', percentage: 42, color: 'var(--primary)' },
  { name: 'Instagram', percentage: 28, color: '#E1306C' },
  { name: 'Facebook', percentage: 18, color: '#1877F2' },
  { name: 'Referral', percentage: 8, color: 'var(--success)' },
  { name: 'Walk-in', percentage: 4, color: 'var(--warning)' },
];

const filterOptions = ['This Week', 'This Month', 'Last 6 Months', 'This Year'];

export default function LeadAnalytics() {
  const [filter, setFilter] = useState('This Year');
  const [activeMetric, setActiveMetric] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="analytics-section">
      {/* 70% Width: Lead Growth Analytics */}
      <div className="analytics-card stat-glass-card growth-analytics">
        <div className="analytics-header">
          <h2 className="analytics-title">Lead Analytics</h2>
          
          <div className="custom-dropdown-container" ref={dropdownRef}>
            <button 
              className="analytics-filter-btn" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {filter}
              <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
            </button>
            
            {isDropdownOpen && (
              <div className="custom-dropdown-menu">
                {filterOptions.map(option => (
                  <div 
                    key={option} 
                    className={`dropdown-item ${filter === option ? 'selected' : ''}`}
                    onClick={() => {
                      setFilter(option);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="analytics-tabs">
          {Object.keys(metricConfigs).map(key => (
            <button
              key={key}
              className={`metric-tab ${activeMetric === key ? 'active' : ''}`}
              onClick={() => setActiveMetric(key)}
            >
              {metricConfigs[key].label}
            </button>
          ))}
        </div>

        <div className="analytics-chart-container">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="currentColor" className="chart-grid" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--text-secondary)', fontSize: 13, fontFamily: 'Inter, sans-serif' }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--text-secondary)', fontSize: 13, fontFamily: 'Inter, sans-serif' }} 
                dx={-10}
              />
              <Tooltip 
                 contentStyle={{ 
                   backgroundColor: 'var(--surface)', 
                   border: '1px solid var(--border)', 
                   borderRadius: '12px', 
                   boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                   fontFamily: 'Inter, sans-serif'
                 }}
              />
              {activeMetric === 'all' ? (
                Object.keys(metricConfigs).filter(k => k !== 'all').map(key => (
                  <Line 
                    key={key}
                    type="monotone" 
                    dataKey={key} 
                    stroke={metricConfigs[key].color} 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: 'var(--surface)', stroke: metricConfigs[key].color, strokeWidth: 2 }} 
                    activeDot={{ r: 6, fill: metricConfigs[key].color, stroke: 'var(--surface)' }} 
                  />
                ))
              ) : (
                <Line 
                  type="monotone" 
                  dataKey={activeMetric} 
                  stroke={metricConfigs[activeMetric].color} 
                  strokeWidth={4} 
                  dot={{ r: 5, fill: 'var(--surface)', stroke: metricConfigs[activeMetric].color, strokeWidth: 2 }} 
                  activeDot={{ r: 8, fill: metricConfigs[activeMetric].color, stroke: 'var(--surface)' }} 
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="analytics-metrics-grid">
          <div className="metric-item">
            <span className="metric-label">Total Leads</span>
            <span className="metric-value">1,190</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">New Leads</span>
            <span className="metric-value">312</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Converted</span>
            <span className="metric-value">84</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Lost</span>
            <span className="metric-value">12</span>
          </div>
        </div>
      </div>

      {/* 30% Width: Lead Sources */}
      <div className="analytics-card stat-glass-card sources-analytics">
        <div className="analytics-header">
          <h2 className="analytics-title">Lead Sources</h2>
        </div>
        
        <div className="sources-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%' }}>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={leadSources}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={6}
                dataKey="percentage"
                stroke="none"
                cornerRadius={6}
              >
                {leadSources.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    style={{ filter: `drop-shadow(0px 4px 8px ${entry.color}40)` }} 
                  />
                ))}
              </Pie>
              <Tooltip 
                 contentStyle={{ 
                   backgroundColor: 'var(--surface)', 
                   border: '1px solid var(--border)', 
                   borderRadius: '12px', 
                   boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                   fontFamily: 'Inter, sans-serif',
                   fontWeight: 600
                 }}
                 itemStyle={{ color: 'var(--text-primary)' }}
                 formatter={(value, name) => [`${value}%`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="sources-legend" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {leadSources.map((source, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ 
                    width: '12px', height: '12px', borderRadius: '50%', 
                    backgroundColor: source.color, 
                    boxShadow: `0 2px 6px ${source.color}80`
                  }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-primary)', fontWeight: 600 }}>{source.name}</span>
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 700 }}>{source.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
