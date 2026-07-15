import React from 'react';

export default function AboutSettings() {
  return (
    <div className="settings-section">
      <h2 className="settings-section-title">About</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
          <span style={{ color: 'var(--text-secondary, #6b7280)', fontWeight: 500 }}>Product</span>
          <span style={{ color: 'var(--text-primary, #111827)', fontWeight: 600 }}>LeadFlow CRM</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
          <span style={{ color: 'var(--text-secondary, #6b7280)', fontWeight: 500 }}>Version</span>
          <span style={{ color: 'var(--text-primary, #111827)' }}>1.0.0</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
          <span style={{ color: 'var(--text-secondary, #6b7280)', fontWeight: 500 }}>Developer</span>
          <span style={{ color: 'var(--text-primary, #111827)' }}>Akshaya</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
          <span style={{ color: 'var(--text-secondary, #6b7280)', fontWeight: 500 }}>Frontend</span>
          <span style={{ color: 'var(--text-primary, #111827)' }}>React</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
          <span style={{ color: 'var(--text-secondary, #6b7280)', fontWeight: 500 }}>Backend</span>
          <span style={{ color: 'var(--text-primary, #111827)' }}>Node.js</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
          <span style={{ color: 'var(--text-secondary, #6b7280)', fontWeight: 500 }}>Database</span>
          <span style={{ color: 'var(--text-primary, #111827)' }}>MongoDB</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px' }}>
          <span style={{ color: 'var(--text-secondary, #6b7280)', fontWeight: 500 }}>Last Updated</span>
          <span style={{ color: 'var(--text-primary, #111827)' }}>July 2026</span>
        </div>
      </div>
    </div>
  );
}
