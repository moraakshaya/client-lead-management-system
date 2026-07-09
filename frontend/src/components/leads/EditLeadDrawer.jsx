import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
// Using the same CSS file as AddLeadModal since it's now a center modal
import "./addLeadModal.css";
import CustomDropdown from "./CustomDropdown";

export default function EditLeadModal({ isOpen, onClose, lead }) {
  const [formData, setFormData] = useState({
    customer: "",
    company: "",
    email: "",
    phone: "",
    status: "",
    priority: "",
    source: "",
    assignedTo: "",
    notes: ""
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        customer: lead.customer || "",
        company: lead.company || "",
        email: lead.email || "",
        phone: lead.phone || "",
        status: lead.status || "",
        priority: lead.priority || "",
        source: lead.source || "",
        assignedTo: lead.assignedTo || "",
        notes: lead.notes || ""
      });
    }
  }, [lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Lead</h2>
          <button className="close-btn" onClick={onClose}>
            <MdClose />
          </button>
        </div>

        <div className="modal-body">
          <form className="add-lead-form">
            <div className="form-group full-width">
              <label>Full Name</label>
              <input type="text" name="customer" value={formData.customer} onChange={handleChange} />
            </div>

            <div className="form-group full-width">
              <label>Company</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} />
            </div>

            <div className="form-group full-width">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-group full-width">
              <label>Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="form-group full-width">
              <label>Status</label>
              <CustomDropdown 
                name="status"
                value={formData.status} 
                onChange={handleChange}
                options={["New", "Contacted", "Qualified", "Won", "Lost"]} 
              />
            </div>

            <div className="form-group full-width">
              <label>Priority</label>
              <CustomDropdown 
                name="priority"
                value={formData.priority} 
                onChange={handleChange}
                options={["High", "Medium", "Low"]} 
              />
            </div>

            <div className="form-group full-width">
              <label>Source</label>
              <CustomDropdown 
                name="source"
                value={formData.source} 
                onChange={handleChange}
                options={["Website", "Referral", "Event", "Social", "Cold Call"]} 
              />
            </div>

            <div className="form-group full-width">
              <label>Assigned To</label>
              <CustomDropdown 
                name="assignedTo"
                value={formData.assignedTo} 
                onChange={handleChange}
                options={["Alex J.", "Sarah S.", "Mike D.", "Rahul"]} 
              />
            </div>

            <div className="form-group full-width">
              <label>Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows="4"></textarea>
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
