import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/authService';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login(email, password);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f9fafb', padding: '20px' }}>
            <form onSubmit={handleLogin} style={{ padding: '40px', backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}>

                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <span style={{ fontSize: '2rem', color: '#8b5cf6', fontWeight: 'bold' }}>⚡</span>
                    <h2 style={{ color: '#111827', marginTop: '10px' }}>Welcome Back</h2>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Log in to access your LeadFlow dashboard.</p>
                </div>

                {error && <p style={{ color: '#ef4444', textAlign: 'center', backgroundColor: '#fef2f2', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>{error}</p>}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '10px' }}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '25px' }}>
                    <Link to="/forgot-password" style={{ color: '#8b5cf6', fontSize: '0.85rem', textDecoration: 'none', fontWeight: '600' }}>Forgot password?</Link>
                </div>

                <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginBottom: '20px' }}>
                    Login
                </button>

                <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                    Don't have an account? <Link to="/signup" style={{ color: '#8b5cf6', textDecoration: 'none', fontWeight: '600' }}>Sign up</Link>
                </p>

            </form>
        </div>
    );
};
