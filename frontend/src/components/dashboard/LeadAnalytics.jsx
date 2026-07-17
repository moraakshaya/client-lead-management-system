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

const metricConfigs = {
  all: { label: 'All Metrics', color: 'var(--text-primary)' },
  leads: { label: 'Total Leads', color: 'var(--primary)' },
  converted: { label: 'Converted', color: 'var(--success)' },
  pending: { label: 'Pending', color: 'var(--warning)' },
  lost: { label: 'Lost', color: 'var(--danger)' }
};

const filterOptions = ['This Week', 'This Month', 'Last 6 Months', 'This Year'];

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const sourceColors = {
  'Website': 'var(--primary)',
  'Instagram': '#E1306C',
  'Facebook': '#1877F2',
  'Referral': 'var(--success)',
  'Walk-in': 'var(--warning)',
  'Other': 'var(--text-secondary)'
};

export default function LeadAnalytics({ chartData }) {
  const [filter, setFilter] = useState('This Year');
  const [activeMetric, setActiveMetric] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Map backend trend to recharts data
  const data = chartData?.leadTrend?.map(item => ({
    name: monthNames[item._id - 1] || item._id,
    leads: item.leads,
    converted: item.converted,
    pending: item.pending,
    lost: item.lost
  })) || [];

  const totalSources = chartData?.leadSources?.reduce((acc, curr) => acc + curr.count, 0) || 1;
  const leadSourcesData = chartData?.leadSources?.map(item => ({
    name: item._id || 'Unknown',
    percentage: Math.round((item.count / totalSources) * 100),
    color: sourceColors[item._id] || sourceColors['Other']
  })) || [];

  const totalLeads = data.reduce((acc, curr) => acc + curr.leads, 0);
  const pendingLeads = data.reduce((acc, curr) => acc + curr.pending, 0);
  const convertedLeads = data.reduce((acc, curr) => acc + curr.converted, 0);
  const lostLeads = data.reduce((acc, curr) => acc + curr.lost, 0);

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
                allowDecimals={false}
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
            <span className="metric-value">{totalLeads}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Pending</span>
            <span className="metric-value">{pendingLeads}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Converted</span>
            <span className="metric-value">{convertedLeads}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Lost</span>
            <span className="metric-value">{lostLeads}</span>
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
                data={leadSourcesData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={6}
                dataKey="percentage"
                stroke="none"
                cornerRadius={6}
              >
                {leadSourcesData.map((entry, index) => (
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
            {leadSourcesData.map((source, index) => (
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
