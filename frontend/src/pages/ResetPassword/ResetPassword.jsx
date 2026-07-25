import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/authService';

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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <form onSubmit={handleSubmit} style={{ padding: '40px', backgroundColor: 'white', borderRadius: '16px', width: '350px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create New Password</h2>
                {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
                {message && <p style={{ color: 'green', textAlign: 'center', marginBottom: '15px' }}>{message}</p>}

                <input type="password" placeholder="New Password" required minLength="6" onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc' }} />

                <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Save New Password</button>
            </form>
        </div>
    );
};
