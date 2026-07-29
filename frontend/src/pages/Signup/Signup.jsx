import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../../services/authService';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import '../Login/Auth.css'; // Shared auth styles

export const Signup = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', company: '', phone: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
            );
    };

    const validatePassword = (password) => {
        // At least one uppercase letter, one number, one special character, and minimum 6 characters
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/-]).{6,}$/.test(password);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        if (!validatePassword(formData.password)) {
            setError('Password must contain at least one uppercase letter, one number, and one special character.');
            return;
        }

        try {
            await signup(formData);
            
            // Redirect to login instead of instantly logging in
            navigate('/login', { state: { successMessage: 'Account created successfully! Please log in.' } });
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating account');
        }
    };

    const handleSocialSignup = (provider) => {
        alert(`Social signup with ${provider} is not yet implemented.`);
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
                        <h2>Get Started</h2>
                        <p>Already have an account? <Link to="/login">Sign In</Link></p>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <form onSubmit={handleSignup} className="auth-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="auth-input"
                                placeholder="John Doe"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="auth-input"
                                placeholder="name@domain.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="auth-input"
                                placeholder="••••••••••••"
                                required
                                minLength="6"
                                value={formData.password}
                                onChange={handleChange}
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

                        <button type="submit" className="auth-btn-primary">
                            Sign Up
                        </button>

                        <div className="auth-divider">Or sign up with</div>

                        <div className="social-buttons">
                            <button type="button" className="social-btn" onClick={() => handleSocialSignup('Google')} aria-label="Sign up with Google">
                                <FaGoogle className="social-icon" style={{color: '#ea4335'}} />
                            </button>
                            <button type="button" className="social-btn" onClick={() => handleSocialSignup('Twitter')} aria-label="Sign up with Twitter">
                                <FaTwitter className="social-icon" style={{color: '#1DA1F2'}} />
                            </button>
                            <button type="button" className="social-btn" onClick={() => handleSocialSignup('Facebook')} aria-label="Sign up with Facebook">
                                <FaFacebook className="social-icon" style={{color: '#1877f2'}} />
                            </button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    );
};
