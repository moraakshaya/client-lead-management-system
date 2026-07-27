import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiUsers, FiTarget, FiCalendar, FiFileText,
    FiTrendingUp, FiClock, FiCheckCircle, FiShield,
    FiZap, FiSmartphone, FiUserPlus, FiHeart,
    FiBarChart2, FiList
} from 'react-icons/fi';
import './LandingPage.css';

export const LandingPage = () => {
    const navigate = useNavigate();
    const [activeCard, setActiveCard] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const theme = document.documentElement.getAttribute('data-theme');
        setIsDarkMode(theme === 'dark');

        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionHeight = sectionRef.current.offsetHeight;
            // Amount scrolled past the top of the section
            const scrolled = Math.max(0, -rect.top);
            // Scrollable range = total section height minus one viewport
            const scrollRange = sectionHeight - window.innerHeight;
            const progress = Math.min(1, scrolled / scrollRange);
            // Map 0–1 progress across 4 cards (each gets 25% of scroll range)
            const index = Math.min(3, Math.floor(progress * 4));
            setActiveCard(index);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        const handleNavScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleNavScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleNavScroll);
        };
    }, []);

    return (
        <div className="landing-container">
            {/* Hero Wrapper containing Nav and Hero for unified background */}
            <div className="hero-wrapper" id="home">
                {/* 1. Navigation Bar */}
                <div className={`nav-container ${isScrolled ? 'scrolled' : ''}`}>
                    <nav className="landing-nav-pill">
                        <div className="nav-logo">
                            <img src={isDarkMode ? "/footer.png" : "/logoful.png"} alt="LeadFlow Logo" style={{ height: '36px' }} />
                        </div>
                        <div className="nav-links">
                            <a href="#home">Home</a>
                            <a href="#features">Features</a>
                            <a href="#how-it-works">How It Works</a>
                            <a href="#why-choose">Why Choose CRM</a>
                        </div>
                        <div className="nav-auth">
                            <div className="landing-theme-toggle" onClick={() => {
                                const newTheme = !isDarkMode;
                                setIsDarkMode(newTheme);
                                document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
                            }}>
                                <div className={`landing-theme-switch ${isDarkMode ? 'dark' : ''}`}>
                                    <div className="switch-knob"></div>
                                </div>
                            </div>
                            <button className="btn-signup" onClick={() => navigate('/signup')}>Sign Up</button>
                        </div>
                    </nav>
                </div>

                {/* 2. Hero Section */}
                <section className="hero-section centered-hero">
                    <div className="hero-content-centered">
                        <div className="hero-badge">
                            <span className="badge-new">New</span> ✨ Your Business, Simplified
                        </div>
                        <h1 className="hero-title">
                            One Dashboard To Manage<br />Your Entire <span className="highlight">Business.</span>
                        </h1>
                        <p className="hero-subtitle">
                            From leads to client management and follow-up tracking, LeadFlow<br />keeps your business organized in one platform.
                        </p>
                        <div className="hero-actions-centered">
                            <button className="btn-primary-large" onClick={() => navigate('/signup')}>Sign Up</button>
                            <button className="btn-demo" onClick={() => navigate('/login')}>
                                Login
                            </button>
                        </div>
                    </div>
                    <div className="hero-mockup-centered">
                        <div className="glass-panel mockup-window-large">
                            <div className="mockup-header">
                                <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                            </div>
                            <div className="mockup-body">
                                <div className="mockup-sidebar"></div>
                                <div className="mockup-content">
                                    <div className="mockup-grid">
                                        <div className="mockup-card"></div>
                                        <div className="mockup-card"></div>
                                        <div className="mockup-card"></div>
                                    </div>
                                    <div className="mockup-card large"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="continuous-flow-bg">
                {/* 3. Stats Section */}
                <section className="new-stats-section">
                    <div className="stat-item">
                        <h2>125k+</h2>
                        <p>User Active</p>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <h2>92k</h2>
                        <p>User Passive</p>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <h2>25%</h2>
                        <p>Increase In Users</p>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <h2>&gt;12k</h2>
                        <p>Good Testimonials</p>
                    </div>
                </section>

                {/* 4. Our Value Section */}
                <section className="our-value-section" id="how-it-works">
                    <div className="value-header-centered">
                        <h2 className="value-title">How It Works</h2>
                        <p className="value-subtitle">
                            From tracking leads to seamless client management, LeadFlow <br />
                            keeps your entire pipeline organized in one powerful platform.
                        </p>
                    </div>
                    <div className="value-cards-grid">
                        <div className="value-card">
                            <div className="value-icon icon-blue"><FiTrendingUp /></div>
                            <h3>Stable Growth</h3>
                            <p>Track your conversions and monitor steady growth in your sales pipeline effortlessly.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon icon-pink"><FiShield /></div>
                            <h3>Secure Data</h3>
                            <p>Your client data and business metrics are protected with enterprise-grade security.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon icon-green"><FiUsers /></div>
                            <h3>Easy Communication</h3>
                            <p>Maintain clear, consistent follow-ups and build stronger relationships with clients.</p>
                        </div>
                    </div>
                </section>

                {/* NEW: 4.5 Bento Features Section */}
                <section className="bento-features-section" id="features">
                    <div className="bento-header">
                        <h2>Everything You Need.<br />Nothing You Don't.</h2>
                        <p>Comprehensive client lead management designed with simplicity and security in mind.</p>
                    </div>
                    <div className="bento-grid">
                        {/* Column 1 */}
                        <div className="bento-col">
                            <div className="bento-card">
                                <div className="bento-icon"><FiTarget /></div>
                                <h4>Lead Management</h4>
                                <p>Store, organize and track leads from first contact to conversion.</p>
                            </div>
                            <div className="bento-card">
                                <div className="bento-icon"><FiFileText /></div>
                                <h4>Notes</h4>
                                <p>Attach notes to leads and clients for better collaboration.</p>
                            </div>
                        </div>
                        {/* Column 2 */}
                        <div className="bento-col">
                            <div className="bento-card bento-large-purple">
                                <div className="bento-app-mockup">
                                    <div className="bento-app-header">
                                        <div className="bento-app-avatar"></div>
                                        <div className="bento-app-bell"></div>
                                    </div>
                                    <h5>Upcoming Meeting</h5>
                                    <h3>Follow-up Call</h3>
                                    <div className="bento-app-schedule">
                                        <div className="schedule-item">
                                            <div className="schedule-time">10:00 AM</div>
                                            <div className="schedule-details">
                                                <strong>Luca Changretta</strong>
                                                <span>Premium Prospect</span>
                                            </div>
                                        </div>
                                        <div className="schedule-item">
                                            <div className="schedule-time">02:30 PM</div>
                                            <div className="schedule-details">
                                                <strong>Product Demo</strong>
                                                <span>Acme Corp</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bento-card">
                                <div className="bento-icon"><FiShield /></div>
                                <h4>Secure &amp; Encrypted</h4>
                                <p>Enterprise-grade data security with end-to-end encryption and privacy controls.</p>
                            </div>
                        </div>
                        {/* Column 3 */}
                        <div className="bento-col">
                            <div className="bento-card">
                                <div className="bento-icon"><FiUsers /></div>
                                <h4>Client Management</h4>
                                <p>Maintain complete client records with contact history.</p>
                            </div>
                            <div className="bento-card">
                                <div className="bento-icon"><FiClock /></div>
                                <h4>Activity Timeline</h4>
                                <p>Track every important action across your CRM.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>{/* end continuous-flow-bg */}

            {/* Workflow Section */}
            <section className="workflow-section">
                <div className="workflow-card no-bg">
                    <div className="workflow-content-updated">
                        <div className="workflow-badge">HOW IT WORKS</div>
                        <h2>A simple workflow from lead to long-term client.</h2>
                        <p>
                            Our CRM helps you organize every stage of your sales process. From capturing new leads to nurturing relationships with existing clients, everything stays connected in one place.
                        </p>

                        <div className="workflow-points-vertical">
                            <div className="workflow-point simple-point">
                                <div className="point-number">1</div>
                                <div className="point-text">
                                    <h4>Capture Lead</h4>
                                    <p>Collect and organize new inquiries with complete contact details.</p>
                                </div>
                            </div>
                            <div className="workflow-point simple-point">
                                <div className="point-number">2</div>
                                <div className="point-text">
                                    <h4>Track Progress</h4>
                                    <p>Track lead status, priority, and potential business value.</p>
                                </div>
                            </div>
                            <div className="workflow-point simple-point">
                                <div className="point-number">3</div>
                                <div className="point-text">
                                    <h4>Schedule Follow-up</h4>
                                    <p>Plan calls, meetings, and reminders so no opportunity is missed.</p>
                                </div>
                            </div>
                            <div className="workflow-point simple-point">
                                <div className="point-number">4</div>
                                <div className="point-text">
                                    <h4>Convert to Client</h4>
                                    <p>Convert qualified leads into clients while keeping their complete history.</p>
                                </div>
                            </div>
                            <div className="workflow-point simple-point">
                                <div className="point-number">5</div>
                                <div className="point-text">
                                    <h4>Manage Relationship</h4>
                                    <p>Manage client activities, notes, and performance from a single dashboard.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="workflow-visual-updated">
                        <div className="visual-orbits">
                            <div className="orbit orbit-1"></div>
                            <div className="orbit orbit-2"></div>

                            <div className="center-logo-text">
                                <strong>LeadFlow</strong>
                                <span>CRM</span>
                            </div>

                            <div className="node node-1">
                                <div className="node-icon-3d icon-3d-blue"><FiUserPlus /></div>
                                <span className="node-label">Capture Lead</span>
                            </div>
                            <div className="node node-2">
                                <div className="node-icon-3d icon-3d-purple"><FiTarget /></div>
                                <span className="node-label">Track Progress</span>
                            </div>
                            <div className="node node-3">
                                <div className="node-icon-3d icon-3d-pink"><FiCalendar /></div>
                                <span className="node-label">Schedule Follow-up</span>
                            </div>
                            <div className="node node-4">
                                <div className="node-icon-3d icon-3d-orange"><FiCheckCircle /></div>
                                <span className="node-label">Convert to Client</span>
                            </div>
                            <div className="node node-5">
                                <div className="node-icon-3d icon-3d-green"><FiBarChart2 /></div>
                                <span className="node-label">Manage Relationship</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dashboard Preview Section */}
            <section className="dashboard-preview-section" ref={sectionRef}>
                <div className="dashboard-preview-sticky">
                    <div className="preview-header-centered">
                        <span className="preview-subtitle">Dashboard Preview</span>
                        <h2>Experience the power of a unified CRM</h2>
                    </div>

                    <div className="preview-content">
                        {/* Stacked Cards Left */}
                        <div className="preview-left-stack">
                            {[
                                {
                                    label: 'Dashboard',
                                    color: '#6366f1',
                                    bgColor: '#eef2ff',
                                    icon: <FiBarChart2 />,
                                    lines: ['Total Revenue', 'Active Leads', 'Conversions'],
                                    values: ['$48,290', '142', '89%']
                                },
                                {
                                    label: 'Leads',
                                    color: '#0ea5e9',
                                    bgColor: '#f0f9ff',
                                    icon: <FiUserPlus />,
                                    lines: ['New Today', 'In Pipeline', 'Hot Leads'],
                                    values: ['12', '58', '9']
                                },
                                {
                                    label: 'Clients',
                                    color: '#10b981',
                                    bgColor: '#f0fdf4',
                                    icon: <FiUsers />,
                                    lines: ['Total Clients', 'Active', 'New This Month'],
                                    values: ['320', '284', '22']
                                },
                                {
                                    label: 'Follow-ups',
                                    color: '#f59e0b',
                                    bgColor: '#fffbeb',
                                    icon: <FiCalendar />,
                                    lines: ['Due Today', 'This Week', 'Completed'],
                                    values: ['5', '23', '18']
                                }
                            ].map((card, i) => {
                                const isActive = i === activeCard;
                                const isPast = i < activeCard;
                                const isFuture = i > activeCard;
                                return (
                                    <div
                                        key={i}
                                        className="stack-card"
                                        style={{
                                            transform: isActive
                                                ? 'translateY(0) scale(1) rotateX(0deg)'
                                                : isPast
                                                    ? `translateY(120%) scale(0.9) rotateX(-10deg)`
                                                    : `translateY(${(i - activeCard) * 28}px) scale(${1 - (i - activeCard) * 0.05})`,
                                            zIndex: isActive ? 10 : isFuture ? 10 - i : 0,
                                            opacity: isActive ? 1 : isPast ? 0 : Math.max(0.3, 1 - (i - activeCard) * 0.25),
                                            borderTop: `4px solid ${card.color}`,
                                            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease',
                                        }}
                                    >
                                        <div className="stack-card-header" style={{ background: card.bgColor }}>
                                            <span className="stack-card-icon" style={{ color: card.color }}>{card.icon}</span>
                                            <span className="stack-card-label" style={{ color: card.color }}>{card.label}</span>
                                            <div className="stack-dots">
                                                <span></span><span></span><span></span>
                                            </div>
                                        </div>
                                        <div className="stack-card-body">
                                            {card.lines.map((line, j) => (
                                                <div className="stack-card-row" key={j}>
                                                    <span className="stack-row-label">{line}</span>
                                                    <span className="stack-row-value" style={{ color: card.color }}>{card.values[j]}</span>
                                                </div>
                                            ))}
                                            <div className="stack-card-bar" style={{ background: `${card.color}22` }}>
                                                <div className="stack-card-bar-fill" style={{ width: `${60 + i * 10}%`, background: card.color }}></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right Steps */}
                        <div className="preview-right-list">
                            {[
                                { n: 1, title: 'Dashboard Overview', desc: "Get a bird's-eye view of your entire business performance, revenue, and active tasks." },
                                { n: 2, title: 'Lead Management', desc: 'Track new prospects and seamlessly monitor their journey through your sales pipeline.' },
                                { n: 3, title: 'Client Records', desc: 'Maintain detailed histories and notes for every client interaction in one place.' },
                                { n: 4, title: 'Follow-up Scheduler', desc: 'Never miss a meeting with automated scheduling and priority reminders.' },
                            ].map(({ n, title, desc }) => (
                                <div key={n} className={`preview-step ${n - 1 === activeCard ? 'active-step' : ''}`}>
                                    <div className="step-number">{n}</div>
                                    <div className="step-text">
                                        <h3>{title}</h3>
                                        <p>{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW: Why Choose Section */}
            <section className="why-choose-section" id="why-choose">
                <div className="why-choose-header">
                    <h2>Why Choose This CRM</h2>
                </div>
                <div className="why-choose-grid">
                    <div className="why-card">
                        <div className="why-visual">
                            <div className="visual-inner">
                                <div className="visual-header">
                                    <span className="visual-title">Total user this month</span>
                                    <span className="visual-link">Learn More</span>
                                </div>
                                <div className="visual-stats">
                                    <div className="v-stat"><span>Active Users</span><strong>12.4k</strong></div>
                                    <div className="v-stat"><span>New Users</span><strong>75%</strong></div>
                                    <div className="v-stat"><span>Retention</span><strong>70.2k</strong></div>
                                </div>
                                <div className="visual-chart-line"></div>
                            </div>
                        </div>
                        <div className="why-content">
                            <h3>Modern UI</h3>
                            <p>Gain a deep understanding of how users interact with your products.</p>
                        </div>
                    </div>

                    <div className="why-card">
                        <div className="why-visual">
                            <div className="visual-inner gauge-layout">
                                <div className="visual-header">
                                    <span className="visual-title">Analytics</span>
                                </div>
                                <div className="gauge-container">
                                    <div className="gauge-arc"></div>
                                    <strong className="gauge-value">80%</strong>
                                </div>
                            </div>
                        </div>
                        <div className="why-content">
                            <h3>Responsive Design</h3>
                            <p>Monitor key performance indicators (KPIs) such as retention rates.</p>
                        </div>
                    </div>

                    <div className="why-card">
                        <div className="why-visual">
                            <div className="visual-inner kpi-layout">
                                <div className="visual-header">
                                    <span className="visual-title">KPI</span>
                                </div>
                                <div className="kpi-group">
                                    <span className="kpi-label">Total Profit</span>
                                    <div className="kpi-row">
                                        <strong>$873.4k</strong>
                                        <span className="badge-up">+15%</span>
                                    </div>
                                </div>
                                <div className="kpi-group">
                                    <span className="kpi-label">Total Expense</span>
                                    <div className="kpi-row">
                                        <strong>124,970</strong>
                                        <span className="badge-up">+7%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="why-content">
                            <h3>Fast Performance</h3>
                            <p>Test new features and variations with data-driven experiments.</p>
                        </div>
                    </div>

                    <div className="why-card">
                        <div className="why-visual">
                            <div className="visual-inner kpi-layout">
                                <div className="visual-header">
                                    <span className="visual-title">Security</span>
                                </div>
                                <div className="kpi-group">
                                    <span className="kpi-label">Authentication</span>
                                    <div className="kpi-row">
                                        <strong>End-to-End</strong>
                                        <span className="badge-up" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>Safe</span>
                                    </div>
                                </div>
                                <div className="kpi-group">
                                    <span className="kpi-label">Uptime</span>
                                    <div className="kpi-row">
                                        <strong>99.9%</strong>
                                        <span className="badge-up" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>Live</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="why-content">
                            <h3>Secure Authentication</h3>
                            <p>Protect your sensitive business data with robust, enterprise-grade security.</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* 9. Footer */}
            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <img src="/footer.png" alt="LeadFlow Logo" style={{ height: '100px', width: '240px' }} />
                    </div>
                    <div className="footer-links">
                        <a href="#features">Features</a>
                        <a href="#about">About</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms</a>
                        <a href="#contact">Contact</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    © 2026 Client Lead Management System
                </div>
            </footer>
        </div>
    );
};
