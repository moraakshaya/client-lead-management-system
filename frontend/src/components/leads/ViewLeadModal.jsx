import React from "react";
import { MdClose } from "react-icons/md";
import "./addLeadModal.css";

export default function ViewLeadModal({ isOpen, onClose, lead }) {
  if (!isOpen || !lead) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>View Lead Details</h2>
          <button className="close-btn" onClick={onClose}>
            <MdClose />
          </button>
        </div>

        <div className="modal-body">
          <div className="add-lead-form">
            <div className="form-group full-width">
              <label>Full Name</label>
              <div className="filter-input" style={{ backgroundColor: "var(--secondary-light)", cursor: "not-allowed" }}>
                {lead.customer}
              </div>
            </div>

            <div className="form-group full-width">
              <label>Company</label>
              <div className="filter-input" style={{ backgroundColor: "var(--secondary-light)", cursor: "not-allowed" }}>
                {lead.company}
              </div>
            </div>

            <div className="form-group full-width">
              <label>Email</label>
              <div className="filter-input" style={{ backgroundColor: "var(--secondary-light)", cursor: "not-allowed" }}>
                {lead.email}
              </div>
            </div>

            <div className="form-group full-width">
              <label>Phone</label>
              <div className="filter-input" style={{ backgroundColor: "var(--secondary-light)", cursor: "not-allowed" }}>
                {lead.phone}
              </div>
            </div>

            <div className="form-group full-width">
              <label>Status</label>
              <div className="filter-input" style={{ backgroundColor: "var(--secondary-light)", cursor: "not-allowed" }}>
                {lead.status}
              </div>
            </div>

            <div className="form-group full-width">
              <label>Priority</label>
              <div className="filter-input" style={{ backgroundColor: "var(--secondary-light)", cursor: "not-allowed" }}>
                {lead.priority}
              </div>
            </div>

            <div className="form-group full-width">
              <label>Source</label>
              <div className="filter-input" style={{ backgroundColor: "var(--secondary-light)", cursor: "not-allowed" }}>
                {lead.source}
              </div>
            </div>

            <div className="form-group full-width">
              <label>Assigned To</label>
              <div className="filter-input" style={{ backgroundColor: "var(--secondary-light)", cursor: "not-allowed" }}>
                {lead.assignedTo}
              </div>
            </div>

            <div className="form-group full-width">
              <label>Notes</label>
              <div className="filter-input" style={{ backgroundColor: "var(--secondary-light)", cursor: "not-allowed", minHeight: "100px" }}>
                {lead.notes || "No notes available."}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
