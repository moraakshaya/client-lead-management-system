import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/authService';
import '../Login/Auth.css'; // Shared auth styles

export const ResetPassword = () => {
    const { token } = useParams(); // Grabs the secret token from the URL!
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await resetPassword(token, password);
            setMessage(res.data.message);
            setTimeout(() => navigate('/login'), 2000); // Send them to login after 2 seconds
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid or expired token.');
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
                        <h2>Create New Password</h2>
                        <p>Please enter your new secure password.</p>
                    </div>

                    {error && <div className="auth-error">{error}</div>}
                    {message && <div style={{ color: '#16a34a', textAlign: 'center', backgroundColor: '#dcfce7', padding: '10px', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>{message}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                className="auth-input"
                                placeholder="Enter new password"
                                required
                                minLength="6"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="auth-btn-primary">
                            Save New Password
                        </button>
                    </form>
                </div>
                
            </div>
        </div>
    );
};
