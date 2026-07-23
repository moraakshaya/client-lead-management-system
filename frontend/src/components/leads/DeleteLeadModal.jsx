import React, { useState } from 'react';
import { FaTimes, FaExclamationTriangle, FaTrashAlt } from 'react-icons/fa';
import '../clients/editClientModal.css';
import { deleteLead } from '../../services/leadService';
import { toast } from 'react-toastify';
import { handleApiError } from '../../utils/errorHandler';

export default function DeleteLeadModal({ isOpen, onClose, lead, onSuccess }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !lead) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteLead(lead._id);
      toast.success("Lead deleted successfully!");
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      handleApiError(error, 'deleteLead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <FaTrashAlt style={{ marginRight: '10px', color: 'var(--danger)' }} />Delete Lead
          </h2>
          <button className="close-btn" onClick={onClose} disabled={loading}><FaTimes /></button>
        </div>

        <div className="modal-content" style={{ overflowY: 'auto', margin: '10px 10px 10px 20px' }}>
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
              Are you sure you want to delete this lead?
            </p>

            <div style={{ width: 'fit-content', margin: '0 auto 24px auto', textAlign: 'left' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '12px', fontSize: '15px', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '600', textAlign: 'right' }}>Lead Name :</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{lead.leadName || '-'}</span>

                <span style={{ color: 'var(--text-secondary)', fontWeight: '600', textAlign: 'right' }}>Company :</span>
                <span style={{ color: 'var(--text-primary)' }}>{lead.companyName || '-'}</span>

                <span style={{ color: 'var(--text-secondary)', fontWeight: '600', textAlign: 'right' }}>Email :</span>
                <span style={{ color: 'var(--text-primary)' }}>{lead.email || '-'}</span>
              </div>
            </div>

            <div style={{ width: '100%', borderTop: '1px solid var(--border)', paddingTop: '24px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#ef4444', fontWeight: '600' }}>
                This action cannot be undone.
              </p>
            </div>

          </div>
        </div>

        <div className="modal-footer edit-modal-footer" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
          <button className="btn-cancel" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="btn-save" onClick={handleDelete} disabled={loading} style={{ backgroundColor: '#ef4444', boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.2)' }}>
            {loading ? 'Deleting...' : 'Delete Lead'}
          </button>
        </div>
      </div>
    </div>
  );
}
