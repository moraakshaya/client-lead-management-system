import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiUsers, FiTarget, FiCalendar, FiFileText,
    FiTrendingUp, FiClock, FiCheckCircle, FiShield,
    FiZap, FiSmartphone, FiUserPlus, FiHeart,
    FiBarChart2, FiList, FiMenu, FiX
} from 'react-icons/fi';
import './LandingPage.css';

export const LandingPage = () => {
    const navigate = useNavigate();
    const [activeCard, setActiveCard] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeValueCard, setActiveValueCard] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [activeBentoCard, setActiveBentoCard] = useState(0);
    const [isBentoTransitioning, setIsBentoTransitioning] = useState(true);
    const sectionRef = useRef(null);
    const whySliderRef = useRef(null);
    const touchStartXRef = useRef(0);
    const [activeWhyCard, setActiveWhyCard] = useState(0);
    const [isWhyTransitioning, setIsWhyTransitioning] = useState(true);

    useEffect(() => {
        if (activeWhyCard === 4) {
            const timer = setTimeout(() => {
                setIsWhyTransitioning(false);
                setActiveWhyCard(0);
            }, 500);
            return () => clearTimeout(timer);
        } else if (!isWhyTransitioning) {
            const timer = setTimeout(() => {
                setIsWhyTransitioning(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [activeWhyCard, isWhyTransitioning]);

    const handleWhyTouchStart = (e) => {
        touchStartXRef.current = e.touches[0].clientX;
    };

    const handleWhyTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartXRef.current - touchEndX;
        if (diff > 40) {
            setIsWhyTransitioning(true);
            setActiveWhyCard(prev => prev + 1);
        } else if (diff < -40) {
            setIsWhyTransitioning(true);
            setActiveWhyCard(prev => (prev > 0 ? prev - 1 : 3));
        }
    };

    const previewStepsData = [
        {
            n: 1,
            title: 'Dashboard Overview',
            desc: "Get a bird's-eye view of your entire business performance, revenue, and active tasks.",
            label: 'Dashboard',
            color: '#6366f1',
            bgColor: '#eef2ff',
            icon: <FiBarChart2 />,
            lines: ['Total Revenue', 'Active Leads', 'Conversions'],
            values: ['$48,290', '142', '89%']
        },
        {
            n: 2,
            title: 'Lead Management',
            desc: 'Track new prospects and seamlessly monitor their journey through your sales pipeline.',
            label: 'Leads',
            color: '#0ea5e9',
            bgColor: '#f0f9ff',
            icon: <FiUserPlus />,
            lines: ['New Today', 'In Pipeline', 'Hot Leads'],
            values: ['12', '58', '9']
        },
        {
            n: 3,
            title: 'Client Records',
            desc: 'Maintain detailed histories and notes for every client interaction in one place.',
            label: 'Clients',
            color: '#10b981',
            bgColor: '#f0fdf4',
            icon: <FiUsers />,
            lines: ['Total Clients', 'Active', 'New This Month'],
            values: ['320', '284', '22']
        },
        {
            n: 4,
            title: 'Follow-up Scheduler',
            desc: 'Never miss a meeting with automated scheduling and priority reminders.',
            label: 'Follow-ups',
            color: '#f59e0b',
            bgColor: '#fffbeb',
            icon: <FiCalendar />,
            lines: ['Due Today', 'This Week', 'Completed'],
            values: ['5', '23', '18']
        }
    ];

    useEffect(() => {
        const theme = document.documentElement.getAttribute('data-theme');
        setIsDarkMode(theme === 'dark');

        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionHeight = sectionRef.current.offsetHeight;
            const scrolled = Math.max(0, -rect.top);
            const scrollRange = sectionHeight - window.innerHeight;
            const progress = Math.min(1, scrolled / scrollRange);
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

    useEffect(() => {
        // Auto-play for the "How It Works" slider on mobile
        const interval = setInterval(() => {
            if (window.innerWidth <= 768) {
                setActiveValueCard((prev) => prev + 1);
            }
        }, 3500); // 3.5 seconds
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (activeValueCard === 3) {
            const timer = setTimeout(() => {
                setIsTransitioning(false);
                setActiveValueCard(0);
            }, 500);
            return () => clearTimeout(timer);
        } else if (!isTransitioning) {
            const timer = setTimeout(() => {
                setIsTransitioning(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [activeValueCard, isTransitioning]);

    useEffect(() => {
        // Auto-play for the "Bento Features" slider on mobile
        const interval = setInterval(() => {
            if (window.innerWidth <= 768) {
                setActiveBentoCard((prev) => prev + 1);
            }
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (activeBentoCard === 5) { // 5 real cards (indexes 0-4), cloned card is at 5
            const timer = setTimeout(() => {
                setIsBentoTransitioning(false);
                setActiveBentoCard(0);
            }, 500);
            return () => clearTimeout(timer);
        } else if (!isBentoTransitioning) {
            const timer = setTimeout(() => {
                setIsBentoTransitioning(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [activeBentoCard, isBentoTransitioning]);

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
                            <div className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                            </div>
                        </div>

                        {/* Mobile Sidebar Dropdown */}
                        <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
                            <div className="mobile-sidebar-links">
                                <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
                                <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
                                <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
                                <a href="#why-choose" onClick={() => setIsMobileMenuOpen(false)}>Why Choose CRM</a>
                            </div>
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
                            <button className="btn-primary-large" onClick={() => navigate('/login')}>Login</button>
                            <button className="btn-demo" onClick={() => navigate('/login')}>
                                Continue as Guest
                            </button>
                        </div>
                        <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Need a demo account? Use <strong>admin@crm.com</strong>, <strong>manager@crm.com</strong>, or <strong>executive@crm.com</strong> (Password: admin123)
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
                    <div className="value-cards-slider-wrapper">
                        <div
                            className="value-cards-grid"
                            style={{
                                '--active-card': activeValueCard,
                                transition: isTransitioning ? 'transform 0.5s ease' : 'none'
                            }}
                        >
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
                            {/* Cloned Card 0 for seamless infinite loop */}
                            <div className="value-card value-card-clone">
                                <div className="value-icon icon-blue"><FiTrendingUp /></div>
                                <h3>Stable Growth</h3>
                                <p>Track your conversions and monitor steady growth in your sales pipeline effortlessly.</p>
                            </div>
                        </div>
                    </div>
                    {/* Pagination dots (only visible on mobile) */}
                    <div className="value-slider-dots">
                        {[0, 1, 2].map(idx => (
                            <span
                                key={idx}
                                className={`slider-dot ${(activeValueCard % 3) === idx ? 'active' : ''}`}
                                onClick={() => {
                                    setIsTransitioning(true);
                                    setActiveValueCard(idx);
                                }}
                            ></span>
                        ))}
                    </div>
                </section>

                {/* NEW: 4.5 Bento Features Section */}
                <section className="bento-features-section" id="features">
                    <div className="bento-header">
                        <h2>Everything You Need.<br />Nothing You Don't.</h2>
                        <p>Comprehensive client lead management designed with simplicity and security in mind.</p>
                    </div>
                    <div className="bento-grid desktop-only">
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

                    {/* MOBILE LAYOUT (Slider + Big Card) */}
                    <div className="bento-mobile-layout mobile-only">
                        {/* Big Purple Card Above Slider */}
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

                        <div className="bento-mobile-slider-wrapper">
                            <div
                                className="bento-mobile-slider"
                                style={{
                                    '--active-card': activeBentoCard,
                                    transition: isBentoTransitioning ? 'transform 0.5s ease' : 'none'
                                }}
                            >
                                {/* Card 0 */}
                                <div className="bento-card">
                                    <div className="bento-icon"><FiTarget /></div>
                                    <h4>Lead Management</h4>
                                    <p>Store, organize and track leads from first contact to conversion.</p>
                                </div>
                                {/* Card 1 */}
                                <div className="bento-card">
                                    <div className="bento-icon"><FiFileText /></div>
                                    <h4>Notes</h4>
                                    <p>Attach notes to leads and clients for better collaboration.</p>
                                </div>
                                {/* Card 2 */}
                                <div className="bento-card">
                                    <div className="bento-icon"><FiShield /></div>
                                    <h4>Secure &amp; Encrypted</h4>
                                    <p>Enterprise-grade data security with end-to-end encryption and privacy controls.</p>
                                </div>
                                {/* Card 3 */}
                                <div className="bento-card">
                                    <div className="bento-icon"><FiUsers /></div>
                                    <h4>Client Management</h4>
                                    <p>Maintain complete client records with contact history.</p>
                                </div>
                                {/* Card 4 */}
                                <div className="bento-card">
                                    <div className="bento-icon"><FiClock /></div>
                                    <h4>Activity Timeline</h4>
                                    <p>Track every important action across your CRM.</p>
                                </div>
                                {/* Card 5 (Clone of Card 0) */}
                                <div className="bento-card bento-card-clone">
                                    <div className="bento-icon"><FiTarget /></div>
                                    <h4>Lead Management</h4>
                                    <p>Store, organize and track leads from first contact to conversion.</p>
                                </div>
                            </div>
                        </div>
                        {/* Pagination dots */}
                        <div className="bento-slider-dots">
                            {[0, 1, 2, 3, 4].map(idx => (
                                <span
                                    key={idx}
                                    className={`slider-dot ${(activeBentoCard % 5) === idx ? 'active' : ''}`}
                                    onClick={() => {
                                        setIsBentoTransitioning(true);
                                        setActiveBentoCard(idx);
                                    }}
                                ></span>
                            ))}
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
                        <div className="preview-left-stack desktop-only">
                            {previewStepsData.map((card, i) => {
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
                            {previewStepsData.map((step, i) => (
                                <div key={step.n} className={`preview-step ${step.n - 1 === activeCard ? 'active-step' : ''}`}>
                                    <div className="step-number">{step.n}</div>
                                    <div className="step-text">
                                        <h3>{step.title}</h3>
                                        <p>{step.desc}</p>

                                        {/* Mobile inline card render */}
                                        <div className="mobile-step-card mobile-only" style={{
                                            display: step.n - 1 === activeCard ? 'block' : 'none',
                                            height: step.n - 1 === activeCard ? 'auto' : 0,
                                            overflow: 'hidden'
                                        }}>
                                            <div
                                                className="stack-card inline-mobile-card"
                                                style={{
                                                    position: 'relative',
                                                    transform: 'none',
                                                    borderTop: `4px solid ${step.color}`,
                                                    marginTop: '1rem'
                                                }}
                                            >
                                                <div className="stack-card-header" style={{ background: step.bgColor }}>
                                                    <span className="stack-card-icon" style={{ color: step.color }}>{step.icon}</span>
                                                    <span className="stack-card-label" style={{ color: step.color }}>{step.label}</span>
                                                    <div className="stack-dots">
                                                        <span></span><span></span><span></span>
                                                    </div>
                                                </div>
                                                <div className="stack-card-body">
                                                    {step.lines.map((line, j) => (
                                                        <div className="stack-card-row" key={j}>
                                                            <span className="stack-row-label">{line}</span>
                                                            <span className="stack-row-value" style={{ color: step.color }}>{step.values[j]}</span>
                                                        </div>
                                                    ))}
                                                    <div className="stack-card-bar" style={{ background: `${step.color}22` }}>
                                                        <div className="stack-card-bar-fill" style={{ width: `${60 + i * 10}%`, background: step.color }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                <div className="why-choose-grid desktop-only">
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

                {/* Mobile Slider Layout */}
                <div className="why-choose-mobile-layout mobile-only">
                    <div className="why-mobile-slider-wrapper">
                        <div
                            className="why-mobile-slider"
                            style={{
                                '--active-card': activeWhyCard,
                                transition: isWhyTransitioning ? 'transform 0.5s ease' : 'none'
                            }}
                            onTouchStart={handleWhyTouchStart}
                            onTouchEnd={handleWhyTouchEnd}
                        >
                            {/* Card 0 */}
                            <div className="why-card why-mobile-card">
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

                            {/* Card 1 */}
                            <div className="why-card why-mobile-card">
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

                            {/* Card 2 */}
                            <div className="why-card why-mobile-card">
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

                            {/* Card 3 */}
                            <div className="why-card why-mobile-card">
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

                            {/* Card 4 (Clone of Card 0 for smooth continuous loop) */}
                            <div className="why-card why-mobile-card">
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
                        </div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="why-slider-dots">
                        {[0, 1, 2, 3].map((idx) => (
                            <span
                                key={idx}
                                className={`slider-dot ${(activeWhyCard % 4) === idx ? 'active' : ''}`}
                                onClick={() => {
                                    setIsWhyTransitioning(true);
                                    setActiveWhyCard(idx);
                                }}
                            ></span>
                        ))}
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
