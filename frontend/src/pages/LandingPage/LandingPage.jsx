import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiUsers, FiTarget, FiCalendar, FiFileText,
    FiTrendingUp, FiClock, FiCheckCircle, FiShield,
    FiZap, FiSmartphone
} from 'react-icons/fi';
import './LandingPage.css';

export const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            {/* 1. Navigation Bar */}
            <nav className="landing-nav">
                <div className="nav-logo">
                    <span className="logo-icon">⚡</span>
                    <span className="logo-text">LeadFlow CRM</span>
                </div>
                <div className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#workflow">Workflow</a>
                    <a href="#preview">Preview</a>
                </div>
                <div className="nav-auth">
                    <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
                    <button className="btn-signup" onClick={() => navigate('/signup')}>Get Started</button>
                </div>
            </nav>

            {/* 2. Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Manage Leads, Build Client Relationships, and <span className="highlight">Grow Your Business.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Track every lead, schedule follow-ups, convert prospects into clients, and monitor your business with one modern CRM.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-primary-large" onClick={() => navigate('/signup')}>Get Started</button>
                        <button className="btn-secondary-large" onClick={() => navigate('/login')}>Login</button>
                    </div>
                </div>
                <div className="hero-mockup">
                    <div className="glass-panel mockup-window">
                        {/* A sleek CSS representation of your dashboard */}
                        <div className="mockup-header">
                            <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                        </div>
                        <div className="mockup-body">
                            <div className="mockup-sidebar"></div>
                            <div className="mockup-content">
                                <div className="mockup-card large"></div>
                                <div className="mockup-grid">
                                    <div className="mockup-card"></div>
                                    <div className="mockup-card"></div>
                                    <div className="mockup-card"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Trusted Stats Section */}
            <section className="stats-section">
                <div className="stat-badge"><FiTarget /> Lead Tracking</div>
                <div className="stat-badge"><FiUsers /> Client Management</div>
                <div className="stat-badge"><FiCalendar /> Follow-up Scheduling</div>
                <div className="stat-badge"><FiTrendingUp /> Business Analytics</div>
            </section>

            {/* 4. Features Section */}
            <section id="features" className="features-section">
                <h2 className="section-title">Everything you need in one place</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon"><FiTarget /></div>
                        <h3>Lead Management</h3>
                        <p>Store, organize and track leads from first contact to conversion.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><FiUsers /></div>
                        <h3>Client Management</h3>
                        <p>Maintain complete client records with detailed contact history.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><FiCalendar /></div>
                        <h3>Follow-ups</h3>
                        <p>Never miss an important meeting, email, or scheduled call.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><FiFileText /></div>
                        <h3>Notes</h3>
                        <p>Attach vital notes to leads and clients for better collaboration.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><FiTrendingUp /></div>
                        <h3>Analytics</h3>
                        <p>Monitor your business performance with real-time dashboards.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><FiClock /></div>
                        <h3>Activity Timeline</h3>
                        <p>Track every important action across your entire CRM history.</p>
                    </div>
                </div>
            </section>

            {/* 5. Workflow Section */}
            <section id="workflow" className="workflow-section">
                <h2 className="section-title">How it works</h2>
                <div className="workflow-container">
                    <div className="workflow-step">
                        <div className="step-circle">1</div>
                        <h4>Capture Lead</h4>
                    </div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-step">
                        <div className="step-circle">2</div>
                        <h4>Track Progress</h4>
                    </div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-step">
                        <div className="step-circle">3</div>
                        <h4>Schedule Follow-up</h4>
                    </div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-step">
                        <div className="step-circle">4</div>
                        <h4>Convert to Client</h4>
                    </div>
                </div>
            </section>

            {/* 7. Why Choose This CRM */}
            <section className="why-choose-section">
                <h2 className="section-title">Why choose LeadFlow?</h2>
                <div className="why-grid">
                    <div className="why-card">
                        <FiZap className="why-icon" />
                        <h4>Fast Performance</h4>
                    </div>
                    <div className="why-card">
                        <FiSmartphone className="why-icon" />
                        <h4>Responsive UI</h4>
                    </div>
                    <div className="why-card">
                        <FiShield className="why-icon" />
                        <h4>Secure Auth</h4>
                    </div>
                    <div className="why-card">
                        <FiCheckCircle className="why-icon" />
                        <h4>Modern Design</h4>
                    </div>
                </div>
            </section>

            {/* 8. Call To Action */}
            <section className="cta-section">
                <h2>Ready to organize your sales process?</h2>
                <p>Join today and take complete control over your leads and clients.</p>
                <button className="btn-primary-large" onClick={() => navigate('/signup')}>Create Account</button>
            </section>

            {/* 9. Footer */}
            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <span className="logo-icon">⚡</span> LeadFlow
                    </div>
                    <div className="footer-links">
                        <a href="#features">Features</a>
                        <a href="#workflow">Workflow</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    © 2026 Client Lead Management System. All rights reserved.
                </div>
            </footer>
        </div>
    );
};
