import React, { useState, useEffect } from 'react';
import { FaTimes, FaStickyNote } from 'react-icons/fa';
import CustomDropdown from '../leads/CustomDropdown';
import '../clients/editClientModal.css';
import { createNote } from '../../services/noteService';
import { getLeads } from '../../services/leadService';
import { handleApiError } from '../../utils/errorHandler';

export default function NotesAddModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    relatedToModel: 'Lead',
    leadId: '',
    notes: '' // Renamed from description to match backend
  });
  
  const [loading, setLoading] = useState(false);
  const [leadsList, setLeadsList] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchOptions();
    }
  }, [isOpen]);

  const fetchOptions = async () => {
    try {
      const leadsRes = await getLeads({ limit: 100 });
      const formattedLeads = leadsRes.data.leads.map(lead => ({
        value: lead._id,
        label: lead.companyName ? `${lead.leadName} (${lead.companyName})` : lead.leadName
      }));
      setLeadsList(formattedLeads);
    } catch (error) {
      console.error("Error fetching leads for dropdown:", error);
    }
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.leadId) {
      alert("Please select a Lead.");
      return;
    }

    try {
      setLoading(true);
      await createNote(formData);
      
      // Clear form and close (onClose automatically refreshes the table in Notes.jsx)
      setFormData({ title: '', relatedToModel: 'Lead', leadId: '', notes: '' });
      onClose();
    } catch (error) {
      handleApiError(error, 'createNote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container edit-modal-container" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><FaStickyNote style={{ marginRight: '10px' }}/> Add Note</h2>
          <button className="close-btn" type="button" onClick={onClose} disabled={loading}><FaTimes /></button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form-content">
          <div className="modal-content">
            <div className="edit-form-grid" style={{ padding: '32px 40px' }}>
              
              <div className="form-group full-width">
                <label>Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter note title..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Related To</label>
                <CustomDropdown 
                  name="relatedToModel"
                  value={formData.relatedToModel} 
                  onChange={handleChange}
                  options={["Lead"]} 
                />
              </div>

              <div className="form-group">
                <label>Select {formData.relatedToModel}</label>
                <CustomDropdown 
                  name="leadId"
                  value={formData.leadId} 
                  onChange={handleChange}
                  options={leadsList}
                  placeholder={`Select a ${formData.relatedToModel}...`}
                />
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea 
                  name="notes" 
                  value={formData.notes} 
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Write your note here..."
                  rows={5}
                  required
                ></textarea>
              </div>

            </div>
          </div>

          <div className="modal-footer edit-modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? "Saving..." : "Save Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
