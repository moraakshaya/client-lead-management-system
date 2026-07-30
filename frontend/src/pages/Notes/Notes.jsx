import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import NotesHeader from '../../components/notes/NotesHeader';
import NotesStatsCards from '../../components/notes/NotesStatsCards';
import NotesFilterBar from '../../components/notes/NotesFilterBar';
import NotesTable from '../../components/notes/NotesTable';
import NotesViewModal from '../../components/notes/NotesViewModal';
import NotesEditModal from '../../components/notes/NotesEditModal';
import NotesDeleteModal from '../../components/notes/NotesDeleteModal';
import NotesAddModal from '../../components/notes/NotesAddModal';
import { getNotes, getNoteStats, updateNote } from '../../services/noteService';
import { handleApiError } from '../../utils/errorHandler';
import './notes.css';

export const Notes = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [selectedNote, setSelectedNote] = useState(null);

  // --- NEW STATE FOR REAL DATA ---
  const [stats, setStats] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalNotes: 0 });
  const [filters, setFilters] = useState({ type: '', status: '', search: '' });

  // --- FETCH DATA ---
  useEffect(() => {
    fetchData();
  }, [filters, pagination.currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch both stats and table data at the exact same time
      const [statsRes, notesRes] = await Promise.all([
        getNoteStats(),
        getNotes({ page: pagination.currentPage, limit: 10, ...filters })
      ]);

      setStats(statsRes.data);
      setNotes(notesRes.data.data);
      setPagination(notesRes.data.pagination);
    } catch (error) {
      handleApiError(error, 'fetchNotes');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action, note) => {
    setSelectedNote(note);
    if (action === 'view') setIsViewModalOpen(true);
    if (action === 'edit') setIsEditModalOpen(true);
    if (action === 'delete') setIsDeleteModalOpen(true);
    if (action === 'add') setIsAddModalOpen(true);

    // Real Pin / Unpin Functionality
    if (action === 'pin') {
      try {
        await updateNote(note._id, { isPinned: !note.isPinned });
        fetchData();
      } catch (error) {
        console.error("Error pinning note:", error);
      }
    }
  };

  const handleExport = async () => {
    try {
      toast.info("Preparing export...");
      const response = await getNotes({ page: 1, limit: 10000, ...filters });
      const notesToExport = response.data.data || [];

      if (notesToExport.length === 0) {
        toast.warning("No notes found to export.");
        return;
      }

      // Define CSV headers
      const headers = ['Date', 'Title', 'Content', 'Related To', 'Entity Name', 'Pinned'];

      // Flatten data and map to rows
      const rows = notesToExport.map(note => {
        const escapeCsv = (str) => {
          if (!str) return '""';
          return `"${String(str).replace(/"/g, '""')}"`;
        };
        
        const date = new Date(note.createdAt).toLocaleDateString();
        
        return [
          escapeCsv(date),
          escapeCsv(note.title),
          escapeCsv(note.notes),
          escapeCsv(note.relatedToModel),
          escapeCsv(note.leadId?.leadName || 'Unknown'),
          escapeCsv(note.isPinned ? 'Yes' : 'No')
        ];
      });

      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');

      // Create Blob and trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `notes_export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Notes exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export notes.");
    }
  };

  return (
    <div className="notes-container">
      <NotesHeader
        onAddNote={() => handleAction('add', null)}
        onExport={handleExport}
      />

      <NotesStatsCards stats={stats} loading={loading} />

      <NotesFilterBar filters={filters} setFilters={setFilters} />

      <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', minWidth: 0 }}>
        <NotesTable
          notes={notes}
          loading={loading}
          pagination={pagination}
          filters={filters}
          setFilters={setFilters}
          onAction={handleAction}
        />
      </div>

      <NotesViewModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} note={selectedNote} />
      <NotesEditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} note={selectedNote} onSuccess={fetchData} />
      <NotesDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} note={selectedNote} onSuccess={fetchData} />
      <NotesAddModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          fetchData();
        }}
      />
    </div>
  );
};

// Trigger HMR
