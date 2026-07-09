import React from "react";
import { MdClose, MdWarning } from "react-icons/md";
import "./addLeadModal.css";

export default function DeleteLeadModal({ isOpen, onClose, lead }) {
  if (!isOpen || !lead) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: "450px" }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--danger)' }}>
            <MdWarning size={28} /> Delete Lead
          </h2>
          <button className="close-btn" onClick={onClose}>
            <MdClose />
          </button>
        </div>

        <div className="modal-body" style={{ textAlign: "center", padding: "32px 24px" }}>
          <p style={{ fontSize: "18px", marginBottom: "16px", color: "var(--text-primary)" }}>
            Are you sure you want to delete this lead?
          </p>
          <p style={{ fontSize: "16px", fontWeight: "600", color: "var(--text-secondary)" }}>
            {lead.customer} {lead.company ? `(${lead.company})` : ""}
          </p>
          <p style={{ fontSize: "14px", marginTop: "16px", color: "var(--text-muted)" }}>
            This action cannot be undone.
          </p>
        </div>

        <div className="modal-footer" style={{ justifyContent: "center" }}>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" style={{ backgroundColor: "var(--danger)" }}>Delete Permanently</button>
        </div>
      </div>
    </div>
  );
}
