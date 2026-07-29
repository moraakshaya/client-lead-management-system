import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../services/authService';
import '../Login/Auth.css'; // Shared auth styles

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [resetLink, setResetLink] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const res = await forgotPassword(email);
            setMessage(res.data.message);
            setResetLink(res.data.resetLink); // We display it here for testing!
        } catch (err) {
            setError(err.response?.data?.message || 'Error processing request');
        }
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
                        <h2>Forgot Password</h2>
                        <p>Enter your email to get a reset link.</p>
                    </div>

                    {error && <div className="auth-error">{error}</div>}
                    {message && <div style={{ color: '#16a34a', textAlign: 'center', backgroundColor: '#dcfce7', padding: '10px', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>{message}</div>}

                    {resetLink && (
                        <div style={{ padding: '10px', backgroundColor: '#f3e8ff', borderRadius: '8px', marginBottom: '20px', wordBreak: 'break-all' }}>
                            <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>Test Link:</p>
                            <a href={resetLink} style={{ fontSize: '0.9rem', color: '#8b5cf6', fontWeight: 'bold' }}>Click here to reset password</a>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
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

                        <button type="submit" className="auth-btn-primary">
                            Send Reset Link
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            <Link to="/login" style={{ color: '#8b5cf6', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>Back to Login</Link>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    );
};
