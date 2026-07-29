import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { login, signup } from '../../services/authService';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import './Auth.css'; // Shared auth styles

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.successMessage) {
            setSuccessMsg(location.state.successMessage);
        }
    }, [location.state]);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
            );
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            const res = await login(email, password);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    const handleGuestLogin = async () => {
        setError('');
        setSuccessMsg('Setting up demo account...');
        try {
            let res;
            try {
                // Try logging in with guest credentials
                res = await login('demo@leadflow.com', 'Portfolio@2026!');
            } catch (err) {
                // If it fails, create the guest account and then login
                await signup({
                    name: 'Guest User',
                    email: 'demo@leadflow.com',
                    password: 'Portfolio@2026!',
                    company: 'Demo Company',
                    phone: '555-0100'
                });
                res = await login('demo@leadflow.com', 'Portfolio@2026!');
            }
            
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to setup guest account. Please try again.');
            setSuccessMsg('');
        }
    };

    const handleSocialLogin = (provider) => {
        alert(`Social login with ${provider} is not yet implemented.`);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                
                {/* Left Side: Inner Card Illustration */}
                <div className="auth-left">
                    <img src="/logoful.png" alt="LeadFlow" className="auth-left-logo" />
                    <img src="/auth-img.png" alt="CRM Dashboard" className="auth-astronaut" />
                    <h3 className="auth-tagline">Welcome to LeadFlow!</h3>
                    <p className="auth-subline">We are a community, together helping thousands of businesses grow.</p>
                </div>

                {/* Right Side: Form */}
                <div className="auth-right">
                    
                    <div className="auth-header">
                        <h2>Welcome Back</h2>
                        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                    </div>

                    {successMsg && <div style={{ color: '#16a34a', textAlign: 'center', backgroundColor: '#dcfce7', padding: '10px', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>{successMsg}</div>}
                    {error && <div className="auth-error">{error}</div>}

                    <form onSubmit={handleLogin} className="auth-form">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="auth-input"
                                placeholder="name@domain.com"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="auth-input"
                                placeholder="••••••••••••"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button 
                                type="button" 
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                            </button>
                        </div>

                        <div className="form-options">
                            <label className="checkbox-label">
                                <input type="checkbox" /> Remember Me
                            </label>
                            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
                        </div>

                        <button type="submit" className="auth-btn-primary">
                            Sign In
                        </button>
                        
                        <button type="button" className="auth-btn-secondary" onClick={handleGuestLogin}>
                            Login as Guest
                        </button>

                        <div className="auth-divider">Or sign in with</div>

                        <div className="social-buttons">
                            <button type="button" className="social-btn" onClick={() => handleSocialLogin('Google')} aria-label="Sign in with Google">
                                <FaGoogle className="social-icon" style={{color: '#ea4335'}} />
                            </button>
                            <button type="button" className="social-btn" onClick={() => handleSocialLogin('Twitter')} aria-label="Sign in with Twitter">
                                <FaTwitter className="social-icon" style={{color: '#1DA1F2'}} />
                            </button>
                            <button type="button" className="social-btn" onClick={() => handleSocialLogin('Facebook')} aria-label="Sign in with Facebook">
                                <FaFacebook className="social-icon" style={{color: '#1877f2'}} />
                            </button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    );
};
