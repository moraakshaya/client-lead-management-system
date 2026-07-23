import React, { useState } from 'react';
import { FaTimes, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { deleteClient } from '../../services/clientService';
import './editClientModal.css';

export default function DeleteClientModal({ isOpen, onClose, client, onSuccess }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !client) return null;

  const handleDelete = async () => {
    try {
      setIsSaving(true);
      await deleteClient(client._id);
      setIsSuccess(true);
      if (onSuccess) onSuccess();

      setTimeout(() => {
        setIsSuccess(false);
        setIsSaving(false);
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Failed to delete client", error);
      alert("Failed to delete client.");
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <FaExclamationTriangle style={{ marginRight: '10px', color: '#ef4444' }} /> Delete Client
          </h2>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>

        {isSuccess ? (
          <div className="modal-content" style={{ padding: '64px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ marginBottom: '24px', animation: 'scaleIn 0.3s ease-out forwards' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="40" fill="#ef4444" fillOpacity="0.1" />
                <path d="M53.3333 28.3333L32.9167 48.75L26.6667 42.5L23.3333 45.8333L32.9167 55.4167L56.6667 31.6667L53.3333 28.3333Z" fill="#ef4444" />
              </svg>
            </div>
            <h2 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'center' }}>
              Client Deleted!
            </h2>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>The client has been permanently removed.</p>
          </div>
        ) : (
          <>
            <div className="modal-content" style={{ overflowY: 'auto', margin: '0 0px 0px 30px' }}>
              <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px -2px rgba(239, 68, 68, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.8)',
                  marginBottom: '24px',
                  border: '1px solid rgba(254, 226, 226, 0.5)'
                }}>
                  <FaExclamationTriangle size={36} color="#ef4444" style={{ filter: 'drop-shadow(0 2px 4px rgba(239, 68, 68, 0.2))' }} />
                </div>

                <p style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '32px', textAlign: 'center' }}>
                  Are you sure you want to delete this client?
                </p>

                <div style={{ width: 'fit-content', margin: '0 auto 24px auto', textAlign: 'left' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '12px', fontSize: '15px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: '600', textAlign: 'right' }}>Client Name :</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{client.clientName || client.customer || client.client || '-'}</span>

                    <span style={{ color: 'var(--text-secondary)', fontWeight: '600', textAlign: 'right' }}>Company :</span>
                    <span style={{ color: 'var(--text-primary)' }}>{client.companyName || client.company || '-'}</span>

                    <span style={{ color: 'var(--text-secondary)', fontWeight: '600', textAlign: 'right' }}>Email :</span>
                    <span style={{ color: 'var(--text-primary)' }}>{client.email || '-'}</span>
                  </div>
                </div>

                <div style={{ width: '100%', borderTop: '1px solid var(--border)', paddingTop: '24px', textAlign: 'center' }}>
                  <p style={{ fontSize: '14px', color: '#ef4444', fontWeight: '600' }}>
                    This action cannot be undone.
                  </p>
                </div>

              </div>
            </div>

            <div className="modal-footer edit-modal-footer">
              <button className="btn-cancel" onClick={onClose} disabled={isSaving}>Cancel</button>
              <button className="btn-save" style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }} onClick={handleDelete} disabled={isSaving}>
                {isSaving ? 'Deleting...' : 'Delete Client'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
