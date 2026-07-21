import React, { useState } from 'react';
import { FaTimes, FaSync, FaCheckCircle, FaHandshake, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { convertLeadToClient } from '../../services/leadService';
import { toast } from 'react-toastify';
import '../clients/editClientModal.css';

export default function ConvertToClientModal({ isOpen, onClose, lead, onSuccess }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const navigate = useNavigate();

  if (!isOpen || !lead) return null;

  const handleConvert = async () => {
    try {
      setIsConverting(true);
      await convertLeadToClient(lead._id);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
      toast.success('Lead converted to client successfully!');
    } catch (error) {
      console.error('Error converting lead:', error);
      toast.error('Failed to convert lead to client.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  const handleGoToClients = () => {
    handleClose();
    navigate('/clients');
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>

        {!isSuccess ? (
          <>
            <div className="modal-header">
              <h2 style={{ color: 'var(--primary)' }}>
                <FaSync style={{ marginRight: '10px' }} /> Convert Lead to Client
              </h2>
              <button className="close-btn" onClick={handleClose} disabled={isConverting}><FaTimes /></button>
            </div>

            <div className="modal-content" style={{ overflowY: 'auto', margin: '10px 10px 10px 30px' }}>
              <div style={{ padding: '24px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px -2px rgba(59, 130, 246, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.8)',
                  marginBottom: '20px',
                  border: '1px solid rgba(191, 219, 254, 0.5)'
                }}>
                  <FaHandshake size={32} color="var(--primary)" style={{ filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.2))' }} />
                </div>

                <p style={{ fontSize: '17px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '24px', textAlign: 'center' }}>
                  Are you sure you want to convert this lead into a client?
                </p>

                <div style={{ width: '100%', borderTop: '1px solid var(--border)', paddingTop: '20px', marginBottom: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '12px', fontSize: '15px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Lead Name :</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{lead.leadName || '-'}</span>

                    <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Company :</span>
                    <span style={{ color: 'var(--text-primary)' }}>{lead.companyName || '-'}</span>

                    <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Email :</span>
                    <span style={{ color: 'var(--text-primary)' }}>{lead.email || '-'}</span>

                    <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Phone :</span>
                    <span style={{ color: 'var(--text-primary)' }}>{lead.phone || '-'}</span>

                    <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Current Status :</span>
                    <span style={{ color: 'var(--text-primary)' }}>
                      <span className="badge status-qualified">{lead.status || '-'}</span>
                    </span>
                  </div>
                </div>

                <div style={{ width: '100%', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                  <p style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '16px' }}>
                    After conversion:
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      <FaCheck color="var(--success)" /> Client record will be created.
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      <FaCheck color="var(--success)" /> Lead status will become "Converted".
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      <FaCheck color="var(--success)" /> Client will appear in the Clients module.
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      <FaCheck color="var(--success)" /> Activity timeline will be updated.
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            <div className="modal-footer edit-modal-footer" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
              <button className="btn-cancel" onClick={handleClose} disabled={isConverting}>Cancel</button>
              <button className="btn-save" onClick={handleConvert} disabled={isConverting} style={{ backgroundColor: 'var(--primary)', minWidth: '150px' }}>
                {isConverting ? 'Converting...' : 'Convert to Client'}
              </button>
            </div>
          </>
        ) : (
          <div className="modal-content" style={{ overflowY: 'auto', margin: '10px 10px 10px 30px', padding: '48px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <div style={{ marginBottom: '24px' }}>
              <FaCheckCircle size={64} color="var(--success)" style={{ filter: 'drop-shadow(0 4px 10px rgba(34, 197, 94, 0.3))' }} />
            </div>

            <h2 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'center' }}>
              Lead Successfully Converted
            </h2>

            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '40px', textAlign: 'center' }}>
              <strong>{lead.leadName}</strong> is now a Client.
            </p>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn-cancel" onClick={handleClose}>Close</button>
              <button className="btn-save" onClick={handleGoToClients} style={{ backgroundColor: 'var(--primary)' }}>Go to Clients</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
