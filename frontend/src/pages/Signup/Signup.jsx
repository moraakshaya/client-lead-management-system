import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../../services/authService';

export const Signup = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', company: '', phone: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await signup(formData);

            // Instantly log them in by saving the token
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating account');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f9fafb', padding: '20px' }}>
            <form onSubmit={handleSignup} style={{ padding: '40px', backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <span style={{ fontSize: '2rem', color: '#8b5cf6', fontWeight: 'bold' }}>⚡</span>
                    <h2 style={{ color: '#111827', marginTop: '10px' }}>Create an Account</h2>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Start managing your leads today.</p>
                </div>

                {error && <p style={{ color: '#ef4444', textAlign: 'center', backgroundColor: '#fef2f2', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>{error}</p>}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
                    <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                    <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                    <input type="password" name="password" placeholder="Password (min 6 chars)" required minLength="6" onChange={handleChange} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                    <input type="text" name="company" placeholder="Company Name (Optional)" onChange={handleChange} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                    <input type="tel" name="phone" placeholder="Phone Number (Optional)" onChange={handleChange} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                </div>

                <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginBottom: '20px' }}>
                    Create Account
                </button>

                <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login" style={{ color: '#8b5cf6', textDecoration: 'none', fontWeight: '600' }}>Log in</Link>
                </p>
            </form>
        </div>
    );
};
