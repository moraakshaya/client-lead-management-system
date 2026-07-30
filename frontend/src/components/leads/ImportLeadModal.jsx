import React, { useState, useRef } from "react";
import "./addLeadModal.css";
import { MdClose, MdCloudUpload } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { importLeads } from "../../services/leadService";
import { toast } from "react-toastify";
import { handleApiError } from "../../utils/errorHandler";

export default function ImportLeadModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else if (selectedFile && selectedFile.name.endsWith(".csv")) {
      setFile(selectedFile); // Fallback for OS where type might be empty
    } else {
      toast.error("Please upload a valid .csv file");
      setFile(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "text/csv" || droppedFile.name.endsWith(".csv"))) {
      setFile(droppedFile);
    } else {
      toast.error("Please drop a valid .csv file");
    }
  };

  // Very basic CSV parser
  const parseCSV = (csvText) => {
    const lines = csvText.split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    
    // Map human readable headers to database fields
    const headerMap = {
      'Lead Name': 'leadName',
      'Company Name': 'companyName',
      'Email': 'email',
      'Phone': 'phone',
      'Status': 'status',
      'Priority': 'priority',
      'Source': 'source',
      'Address': 'address'
    };

    const results = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Handle commas inside quotes (basic approach)
      let row = [];
      let inQuotes = false;
      let currentVal = '';
      
      for (let char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          row.push(currentVal);
          currentVal = '';
        } else {
          currentVal += char;
        }
      }
      row.push(currentVal); // push last val

      if (row.length === headers.length) {
        const leadObj = {};
        headers.forEach((header, index) => {
          const fieldName = headerMap[header] || header; // use mapping if exists, else raw header
          let val = row[index].trim().replace(/^"|"$/g, '');
          if (val) {
             leadObj[fieldName] = val;
          }
        });
        
        // Ensure required fields
        if (leadObj.leadName) {
            // Set defaults for missing required fields
            if (!leadObj.source) leadObj.source = 'Website';
            if (!leadObj.priority) leadObj.priority = 'Medium';
            
            // Clean Status Enum
            const validStatuses = ["New", "Contacted", "Qualified", "Won", "Lost"];
            if (leadObj.status) {
                const s = leadObj.status.toLowerCase();
                if (s.includes('won')) leadObj.status = 'Won';
                else if (s.includes('lost')) leadObj.status = 'Lost';
                else if (s.includes('qual')) leadObj.status = 'Qualified';
                else if (s.includes('contact')) leadObj.status = 'Contacted';
                
                if (!validStatuses.includes(leadObj.status)) {
                    const exact = validStatuses.find(v => v.toLowerCase() === leadObj.status.toLowerCase());
                    leadObj.status = exact || 'New';
                }
            } else {
                leadObj.status = 'New';
            }
            
            // Clean phone number for India format (10 digits starting with 6-9)
            if (leadObj.phone) {
                let cleanedPhone = leadObj.phone.replace(/\D/g, ''); // remove non-digits
                if (cleanedPhone.length > 10) {
                    cleanedPhone = cleanedPhone.slice(-10); // take last 10 digits
                }
                // If it's valid, use it. Otherwise leave it so backend validation catches it with a clear error.
                if (/^[6-9]\d{9}$/.test(cleanedPhone)) {
                    leadObj.phone = cleanedPhone;
                }
            } else {
                leadObj.phone = "9999999999"; // Fallback dummy phone if entirely missing
            }

            results.push(leadObj);
        }
      }
    }
    return results;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to import");
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const csvText = event.target.result;
        const leadsData = parseCSV(csvText);

        if (leadsData.length === 0) {
           toast.error("No valid leads found in CSV. Make sure it has 'Lead Name' column.");
           setLoading(false);
           return;
        }

        const response = await importLeads(leadsData);
        toast.success(response.data.message || `Successfully imported ${leadsData.length} leads!`);
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        onSuccess();
        onClose();
      } catch (err) {
        handleApiError(err, 'importLeads');
      } finally {
        setLoading(false);
      }
    };
    
    reader.onerror = () => {
      toast.error("Failed to read the file");
      setLoading(false);
    };

    reader.readAsText(file);
  };

  const handleClose = () => {
    setFile(null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h2>Import Leads</h2>
          <button className="close-btn" onClick={handleClose}>
            <MdClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid" style={{ display: 'block' }}>
            
            <div 
              className="form-group"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed var(--border-color)',
                borderRadius: '8px',
                padding: '40px 20px',
                textAlign: 'center',
                backgroundColor: file ? 'var(--primary-light)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <MdCloudUpload size={48} color={file ? 'var(--primary)' : 'var(--text-secondary)'} style={{ marginBottom: '16px' }} />
              {file ? (
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>{file.name}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Ready to import</p>
                </div>
              ) : (
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Click or drag a .csv file here to upload</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                    CSV must include a "Lead Name" column. Other mapped columns: "Company Name", "Email", "Phone", "Status", "Priority", "Source".
                  </p>
                </div>
              )}
              <input 
                type="file" 
                accept=".csv" 
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>

          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading || !file}
            >
              {loading ? (
                <>
                  <FaSpinner className="spinner-icon" /> Importing...
                </>
              ) : 'Import Leads'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
