import React from "react";
import "./addLeadModal.css";
import { MdClose } from "react-icons/md";
import CustomDropdown from "./CustomDropdown";

export default function AddLeadModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Lead</h2>
          <button className="close-btn" onClick={onClose}>
            <MdClose />
          </button>
        </div>

        <div className="modal-body">
          <form className="add-lead-form">
            <div className="form-group full-width">
              <label>Name</label>
              <input type="text" placeholder="Enter full name" />
            </div>

            <div className="form-group">
              <label>Company</label>
              <input type="text" placeholder="Enter company name" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter email address" />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="Enter phone number" />
            </div>

            <div className="form-group">
              <label>Source</label>
              <CustomDropdown 
                name="source"
                placeholder="Select Source"
                options={["Website", "Referral", "Social Media", "Cold Call"]} 
              />
            </div>

            <div className="form-group">
              <label>Priority</label>
              <CustomDropdown 
                name="priority"
                placeholder="Select Priority"
                options={["High", "Medium", "Low"]} 
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <CustomDropdown 
                name="status"
                placeholder="Select Status"
                options={["New", "Contacted", "Qualified", "Lost"]} 
              />
            </div>

            <div className="form-group">
              <label>Budget</label>
              <input type="text" placeholder="Enter estimated budget" />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea placeholder="Enter any additional details or notes..." rows="3"></textarea>
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save">Save Lead</button>
        </div>
      </div>
    </div>
  );
}
