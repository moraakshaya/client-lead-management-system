import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../services/authService';

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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <form onSubmit={handleSubmit} style={{ padding: '40px', backgroundColor: 'white', borderRadius: '16px', width: '350px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Forgot Password</h2>
                <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem', marginBottom: '20px' }}>Enter your email to get a reset link.</p>

                {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
                {message && <p style={{ color: 'green', textAlign: 'center', marginBottom: '15px' }}>{message}</p>}

                {resetLink && (
                    <div style={{ padding: '10px', backgroundColor: '#f3e8ff', borderRadius: '8px', marginBottom: '20px', wordBreak: 'break-all' }}>
                        <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>Test Link:</p>
                        <a href={resetLink} style={{ fontSize: '0.9rem', color: '#8b5cf6', fontWeight: 'bold' }}>Click here to reset password</a>
                    </div>
                )}

                <input type="email" placeholder="Email Address" required onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc' }} />

                <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px' }}>Send Reset Link</button>
                <div style={{ textAlign: 'center' }}>
                    <Link to="/login" style={{ color: '#8b5cf6', textDecoration: 'none', fontSize: '0.9rem' }}>Back to Login</Link>
                </div>
            </form>
        </div>
    );
};
