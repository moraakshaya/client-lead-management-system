import React, { useState } from "react";
import "./addLeadModal.css";
import { MdClose } from "react-icons/md";
import CustomDropdown from "./CustomDropdown";
import { createLead } from "../../services/leadService";
import { getUsers } from "../../services/userService";

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

  // Fetch users when modal opens
  React.useEffect(() => {
    if (isOpen) {
      getUsers().then(res => setUsers(res.data)).catch(err => console.error("Error fetching users:", err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 2. This function automatically updates the state whenever you type in a box
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 3. This function runs when you click the "Save Lead" button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading
    try {
      setLoading(true);
      // Send the data to the backend database!
      const dataToSave = { ...formData };
      if (!dataToSave.assignedUser) {
        delete dataToSave.assignedUser; // Prevent casting error for empty string
      }
      await createLead(dataToSave);

      // Clear the form for next time
      setFormData({
        leadName: "", companyName: "", email: "", phone: "",
        source: "Website", priority: "Medium", status: "New", budget: "", description: "", assignedUser: ""
      });

      onSuccess(); // Tells the main Leads page to download the new data
      onClose();   // Closes the popup window
    } catch (error) {
      console.error("Error creating lead:", error);
      alert("Failed to save lead.");
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
              {/* We linked every input to the state using 'name', 'value', and 'onChange' */}
              <input
                type="text"
                name="leadName"
                value={formData.leadName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
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
                placeholder="Enter email address"
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
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
                placeholder="Enter estimated budget"
              />
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
              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? "Saving..." : "Save Lead"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
