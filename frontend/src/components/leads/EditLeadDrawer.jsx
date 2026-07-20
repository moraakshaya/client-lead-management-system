import React, { useEffect, useState } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";
import CustomDropdown from "./CustomDropdown";
import "../clients/editClientModal.css";
import { getUsers } from "../../services/userService";
import { updateLead } from "../../services/leadService";

export default function EditLeadModal({ isOpen, onClose, lead, onSuccess }) {
  const [formData, setFormData] = useState({
    leadName: "",
    companyName: "",
    email: "",
    phone: "",
    status: "",
    priority: "",
    source: "",
    assignedUser: "",
    notes: ""
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isOpen) {
      getUsers().then(res => setUsers(res.data)).catch(err => console.error(err));
    }
  }, [isOpen]);

  useEffect(() => {
    if (lead) {
      setFormData({
        leadName: lead.leadName || "",
        companyName: lead.companyName || "",
        email: lead.email || "",
        phone: lead.phone || "",
        status: lead.status || "",
        priority: lead.priority || "",
        source: lead.source || "",
        assignedUser: lead.assignedUser?._id || lead.assignedUser || "",
        notes: lead.notes || ""
      });
    }
  }, [lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSave = { ...formData };
      if (!dataToSave.assignedUser) {
        dataToSave.assignedUser = null;
      }
      await updateLead(lead._id, dataToSave);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update lead");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaEdit style={{ marginRight: '10px' }}/> Edit Lead</h2>
          <button className="close-btn" type="button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form-content">
          <div className="modal-content">
            <div className="edit-form-grid">
              
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="leadName" 
                  value={formData.leadName} 
                  onChange={handleChange} 
                  className="form-input"
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-group">
                <label>Company</label>
                <input 
                  type="text" 
                  name="companyName" 
                  value={formData.companyName} 
                  onChange={handleChange} 
                  className="form-input"
                  placeholder="Enter company"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="form-input"
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
                  className="form-input"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <CustomDropdown 
                  name="status"
                  value={formData.status} 
                  onChange={handleChange}
                  options={["New", "Contacted", "Qualified", "Won", "Lost"]} 
                />
              </div>

              <div className="form-group">
                <label>Priority</label>
                <CustomDropdown 
                  name="priority"
                  value={formData.priority} 
                  onChange={handleChange}
                  options={["High", "Medium", "Low"]} 
                />
              </div>

              <div className="form-group">
                <label>Source</label>
                <CustomDropdown 
                  name="source"
                  value={formData.source} 
                  onChange={handleChange}
                  options={["Website", "Referral", "Event", "Social", "Cold Call"]} 
                />
              </div>

              <div className="form-group">
                <label>Assigned To</label>
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
                <label>Notes</label>
                <textarea 
                  name="notes" 
                  value={formData.notes} 
                  onChange={handleChange} 
                  className="form-textarea"
                  rows="4"
                  placeholder="Enter any additional notes..."
                ></textarea>
              </div>

            </div>
          </div>

          <div className="modal-footer edit-modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
