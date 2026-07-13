import React from "react";
import { FaEllipsisV, FaEye, FaEdit, FaCheck, FaStickyNote, FaTrashAlt, FaCalendarPlus } from "react-icons/fa";
import "./followUpsTable.css";

const FollowUpsTable = ({ onAction }) => {
  const followUps = [
    {
      id: "FU-001",
      clientLead: "John Doe",
      type: "Call",
      date: "20 Jul",
      time: "10AM",
      assigned: "Rahul",
      status: "Today"
    },
    {
      id: "FU-002",
      clientLead: "David",
      type: "Demo",
      date: "22 Jul",
      time: "3PM",
      assigned: "Priya",
      status: "Upcoming"
    }
  ];

  if (!followUps || followUps.length === 0) {
    return (
      <div className="table-container" style={{ padding: '48px', textAlign: 'center', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>No Follow-ups Scheduled</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Schedule a follow-up to stay connected with your customers.</p>
        <button className="btn-primary" onClick={() => document.querySelector('.follow-ups-header .btn-primary').click()}>+ Schedule Follow-up</button>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="follow-ups-table">
          <thead>
            <tr>
              <th>Follow-up</th>
              <th>Client/Lead</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Assigned</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {followUps.map((fu) => (
              <tr key={fu.id}>
                <td className="follow-up-id">{fu.id}</td>
                <td className="client-lead-cell">{fu.clientLead}</td>
                <td>{fu.type}</td>
                <td>{fu.date}</td>
                <td>{fu.time}</td>
                <td>{fu.assigned}</td>
                <td>
                  <span className={`badge status-badge ${fu.status.toLowerCase()}`}>
                    {fu.status}
                  </span>
                </td>
                <td>
                  <div className="table-actions-dropdown">
                    <button className="action-menu-btn"><FaEllipsisV /></button>
                    <div className="dropdown-menu">
                      <button className="dropdown-item view-item" onClick={() => onAction && onAction('view', fu)}><FaEye /> View</button>
                      <button className="dropdown-item edit-item" onClick={() => onAction && onAction('edit', fu)}><FaEdit /> Edit</button>
                      <button className="dropdown-item" style={{ color: 'var(--success)' }} onClick={() => onAction && onAction('complete', fu)}><FaCheck /> Mark as Completed</button>
                      <button className="dropdown-item" onClick={() => onAction && onAction('note', fu)}><FaStickyNote /> Add Note</button>
                      <div className="dropdown-divider" style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }}></div>
                      <button className="dropdown-item delete-item" onClick={() => onAction && onAction('delete', fu)}><FaTrashAlt /> Delete</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-pagination">
        <span className="pagination-info">Showing 1 to 2 of 2 entries</span>
        <div className="pagination-controls">
          <button className="page-btn" disabled>Previous</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default FollowUpsTable;
