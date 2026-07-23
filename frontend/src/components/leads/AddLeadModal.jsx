import React, { useState } from "react";
import "./addLeadModal.css";
import { MdClose } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import CustomDropdown from "./CustomDropdown";
import { createLead } from "../../services/leadService";
import { getUsers } from "../../services/userService";
import { toast } from "react-toastify";
import { handleApiError } from "../../utils/errorHandler";

// We added the onSuccess prop so we can tell the table to refresh after saving
export default function AddLeadModal({ isOpen, onClose, onSuccess }) {
  // 1. Create a state to hold all the typed information
  const [formData, setFormData] = useState({
    leadName: "",
    companyName: "",
    email: "",
    phone: "",
    source: "Website",
    priority: "Medium",
    status: "New",
    budget: "",
    description: "",
    assignedUser: ""
  });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Fetch users when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setErrors({});
      setTouched({});
      getUsers().then(res => setUsers(res.data)).catch(err => console.error("Error fetching users:", err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateField = (name, value) => {
    let error = "";
    if (name === 'leadName' && !value.trim()) {
      error = "Lead name is required.";
    }
    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Please enter a valid email address.";
    }
    if (name === 'phone') {
      if (!value || value.trim() === '') {
        error = "Phone number is required.";
      } else if (/[^0-9]/.test(value)) {
        error = "Phone number can contain only digits.";
      } else if (value.length !== 10) {
        error = "Phone number must contain exactly 10 digits.";
      } else if (!/^[6-9]\d{9}$/.test(value)) {
        error = "Please enter a valid Indian mobile number.";
      }
    }
    if (name === 'budget' && value && isNaN(Number(value.toString().replace(/,/g, '')))) {
      error = "Budget must be numeric.";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone' && value.length > 10) {
      return; 
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  // 3. This function runs when you click the "Save Lead" button
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);
    
    // Mark all relevant fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => allTouched[key] = true);
    setTouched(allTouched);

    if (Object.keys(newErrors).length > 0) {
      return; // Stop if there are validation errors
    }

    try {
      setLoading(true);
      const dataToSave = { ...formData };
      if (!dataToSave.assignedUser) {
        delete dataToSave.assignedUser; 
      }
      await createLead(dataToSave);

      setFormData({
        leadName: "", companyName: "", email: "", phone: "",
        source: "Website", priority: "Medium", status: "New", budget: "", description: "", assignedUser: ""
      });

      toast.success("Lead created successfully!");
      if (onSuccess) onSuccess(); 
      onClose();   
    } catch (error) {
      handleApiError(error, 'createLead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Lead</h2>
          <button className="close-btn" onClick={onClose} disabled={loading}>
            <MdClose />
          </button>
        </div>

        <div className="modal-body">
          {/* We added onSubmit to trigger our save function */}
          <form className="add-lead-form" onSubmit={handleSubmit}>
            <div className="form-group full-width">
              <label>Name</label>
              <input
                type="text"
                name="leadName"
                value={formData.leadName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter full name"
                className={touched.leadName && errors.leadName ? 'input-error' : ''}
              />
              {touched.leadName && errors.leadName && <span className="error-text">{errors.leadName}</span>}
            </div>

            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter company name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter email address"
                className={touched.email && errors.email ? 'input-error' : ''}
              />
              {touched.email && errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter phone number"
                className={touched.phone && errors.phone ? 'input-error' : ''}
              />
              {touched.phone && errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label>Source</label>
              <CustomDropdown
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="Select Source"
                options={["Website", "Referral", "Social Media", "Cold Call"]}
              />
            </div>

            <div className="form-group">
              <label>Priority</label>
              <CustomDropdown
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                placeholder="Select Priority"
                options={["High", "Medium", "Low"]}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <CustomDropdown
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Select Status"
                options={["New", "Contacted", "Qualified", "Lost"]}
              />
            </div>

            <div className="form-group">
              <label>Budget</label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter estimated budget"
                className={touched.budget && errors.budget ? 'input-error' : ''}
              />
              {touched.budget && errors.budget && <span className="error-text">{errors.budget}</span>}
            </div>

            <div className="form-group">
              <label>Assign To</label>
              <CustomDropdown
                name="assignedUser"
                value={formData.assignedUser}
                onChange={handleChange}
                placeholder="Unassigned"
                options={[
                  { value: "", label: "Unassigned" },
                  ...users.map(u => ({ value: u._id, label: u.name }))
                ]}
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter any additional details or notes..."
                rows="3"
              ></textarea>
            </div>

            <div className="modal-footer" style={{ gridColumn: '1 / -1' }}>
              <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>Cancel</button>
              <button type="submit" className="btn-save" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {loading ? <><FaSpinner className="fa-spin" style={{ marginRight: '8px' }} /> Saving...</> : "Save Lead"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
