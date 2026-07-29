import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser, resetUserPassword } from '../../services/userService';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiKey } from 'react-icons/fi';
import { MdClose, MdVisibility, MdVisibilityOff } from "react-icons/md";
import CustomDropdown from '../../components/leads/CustomDropdown';
import '../../components/leads/addLeadModal.css';
import './Users.css';

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    // User Form State
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        email: '',
        phone: '',
        role: 'Sales Executive',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    // Reset Password visibility state
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showConfirmResetPassword, setShowConfirmResetPassword] = useState(false);

    // Reset Password State
    const [resetData, setResetData] = useState({
        id: null,
        name: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const { data } = await getUsers();
            setUsers(data);
        } catch (err) {
            toast.error("Failed to fetch users");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenUserModal = (user = null) => {
        if (user) {
            setIsEditing(true);
            setFormData({
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                role: user.role || 'Sales Executive',
                password: '',
                confirmPassword: ''
            });
        } else {
            setIsEditing(false);
            setFormData({
                id: null,
                name: '',
                email: '',
                phone: '',
                role: 'Sales Executive',
                password: '',
                confirmPassword: ''
            });
        }
        setShowUserModal(true);
    };

    const handleCloseUserModal = () => {
        setShowUserModal(false);
    };

    const validateField = (name, value, currentData) => {
        let error = "";
        if (name === 'name' && !value.trim()) {
            error = "Full name is required.";
        }
        if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "Please enter a valid email address.";
        }
        if (name === 'phone') {
            if (value && /[^0-9]/.test(value)) {
                error = "Phone number can contain only digits.";
            } else if (value && value.length !== 10) {
                error = "Phone number must contain exactly 10 digits.";
            }
        }
        if (name === 'password' && !isEditing) {
            if (value.length < 8) {
                error = "Password must be at least 8 characters.";
            } else if (!/(?=.*[a-z])/.test(value)) {
                error = "Password must contain a lowercase letter.";
            } else if (!/(?=.*[A-Z])/.test(value)) {
                error = "Password must contain an uppercase letter.";
            } else if (!/(?=.*\d)/.test(value)) {
                error = "Password must contain a number.";
            }
        }
        if (name === 'confirmPassword' && !isEditing) {
            if (value !== currentData.password) {
                error = "Passwords do not match.";
            }
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newData = { ...formData, [name]: value };
        setFormData(newData);
        
        if (touched[name]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, value, newData) }));
        }
        if (name === 'password' && touched.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: validateField('confirmPassword', newData.confirmPassword, newData) }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value, formData) }));
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            if (!isEditing || (key !== 'password' && key !== 'confirmPassword')) {
                const err = validateField(key, formData[key], formData);
                if (err) newErrors[key] = err;
            }
        });

        setErrors(newErrors);
        
        const allTouched = {};
        Object.keys(formData).forEach(key => allTouched[key] = true);
        setTouched(allTouched);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        if (!isEditing && formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            if (isEditing) {
                await updateUser(formData.id, {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    role: formData.role
                });
                toast.success("User updated successfully");
            } else {
                if (formData.password.length < 6) {
                    return toast.error("Password must be at least 6 characters");
                }
                await createUser({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    role: formData.role,
                    password: formData.password
                });
                toast.success("User created successfully");
            }
            setShowUserModal(false);
            fetchUsers();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to save user");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to deactivate and delete this user?")) {
            try {
                await deleteUser(id);
                toast.success("User deleted successfully");
                fetchUsers();
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to delete user");
            }
        }
    };

    const handleOpenResetModal = (user) => {
        setResetData({
            id: user._id,
            name: user.name,
            newPassword: '',
            confirmNewPassword: ''
        });
        setShowResetModal(true);
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        if (resetData.newPassword !== resetData.confirmNewPassword) {
            return toast.error("Passwords do not match");
        }
        try {
            await resetUserPassword(resetData.id, { newPassword: resetData.newPassword });
            toast.success(`Password reset for ${resetData.name}`);
            setShowResetModal(false);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to reset password");
        }
    };

    return (
        <div className="users-page">
            <div className="users-header">
                <div>
                    <h1>User Management</h1>
                    <p className="users-subtitle">Manage employee access and roles</p>
                </div>
                <button className="btn-primary" onClick={() => handleOpenUserModal()}>
                    <FiPlus /> Create User
                </button>
            </div>

            <div className="users-table-container">
                {isLoading ? (
                    <div className="loading-state">Loading users...</div>
                ) : (
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>
                                        <div className="user-name-cell">
                                            <div className="user-avatar-mini">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span>{user.name}</span>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`role-badge role-${user.role.toLowerCase().replace(' ', '-')}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>{user.phone || '-'}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-icon" title="Edit User" onClick={() => handleOpenUserModal(user)}>
                                                <FiEdit2 />
                                            </button>
                                            <button className="btn-icon" title="Reset Password" onClick={() => handleOpenResetModal(user)}>
                                                <FiKey />
                                            </button>
                                            <button className="btn-icon delete" title="Deactivate User" onClick={() => handleDelete(user._id)}>
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="empty-state">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Create/Edit User Modal */}
            {showUserModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{isEditing ? 'Edit User' : 'Create New User'}</h2>
                            <button className="close-btn" onClick={handleCloseUserModal}>
                                <MdClose />
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleUserSubmit} className="add-lead-form">
                                <div className="form-group full-width">
                                    <label>Full Name</label>
                                    <input type="text" name="name" required value={formData.name} onChange={handleChange} onBlur={handleBlur} placeholder="Enter full name" className={touched.name && errors.name ? 'input-error' : ''} />
                                    {touched.name && errors.name && <span className="error-text">{errors.name}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange} onBlur={handleBlur} placeholder="Enter email address" className={touched.email && errors.email ? 'input-error' : ''} />
                                    {touched.email && errors.email && <span className="error-text">{errors.email}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} placeholder="Enter phone number" className={touched.phone && errors.phone ? 'input-error' : ''} />
                                    {touched.phone && errors.phone && <span className="error-text">{errors.phone}</span>}
                                </div>
                                <div className="form-group full-width">
                                    <label>Role</label>
                                    <CustomDropdown
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        placeholder="Select Role"
                                        options={["Admin", "Sales Manager", "Sales Executive"]}
                                    />
                                </div>
                                {!isEditing && (
                                    <>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <div className="password-input-wrapper">
                                                <input type={showPassword ? "text" : "password"} name="password" required value={formData.password} onChange={handleChange} onBlur={handleBlur} placeholder="Enter password" className={touched.password && errors.password ? 'input-error' : ''} />
                                                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                                </button>
                                            </div>
                                            {touched.password && errors.password && <span className="error-text">{errors.password}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label>Confirm Password</label>
                                            <div className="password-input-wrapper">
                                                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Confirm password" className={touched.confirmPassword && errors.confirmPassword ? 'input-error' : ''} />
                                                <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                    {showConfirmPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                                </button>
                                            </div>
                                            {touched.confirmPassword && errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                                        </div>
                                    </>
                                )}
                                <div className="modal-footer" style={{ gridColumn: '1 / -1' }}>
                                    <button type="button" className="btn-cancel" onClick={handleCloseUserModal}>Cancel</button>
                                    <button type="submit" className="btn-save">{isEditing ? 'Save Changes' : 'Create User'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Reset Password Modal */}
            {showResetModal && (
                <div className="modal-overlay">
                    <div className="modal-content small-modal">
                        <div className="modal-header">
                            <h2>Reset Password</h2>
                            <button className="close-btn" onClick={() => setShowResetModal(false)}>
                                <MdClose />
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className="modal-subtitle" style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>For {resetData.name}</p>
                            <form onSubmit={handleResetSubmit} className="add-lead-form">
                                <div className="form-group full-width">
                                    <label>New Password</label>
                                    <div className="password-input-wrapper">
                                        <input type={showResetPassword ? "text" : "password"} required minLength="6" value={resetData.newPassword} onChange={e => setResetData({...resetData, newPassword: e.target.value})} placeholder="Enter new password" />
                                        <button type="button" className="password-toggle" onClick={() => setShowResetPassword(!showResetPassword)}>
                                            {showResetPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group full-width">
                                    <label>Confirm Password</label>
                                    <div className="password-input-wrapper">
                                        <input type={showConfirmResetPassword ? "text" : "password"} required value={resetData.confirmNewPassword} onChange={e => setResetData({...resetData, confirmNewPassword: e.target.value})} placeholder="Confirm new password" />
                                        <button type="button" className="password-toggle" onClick={() => setShowConfirmResetPassword(!showConfirmResetPassword)}>
                                            {showConfirmResetPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="modal-footer" style={{ gridColumn: '1 / -1' }}>
                                    <button type="button" className="btn-cancel" onClick={() => setShowResetModal(false)}>Cancel</button>
                                    <button type="submit" className="btn-save">Reset Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
