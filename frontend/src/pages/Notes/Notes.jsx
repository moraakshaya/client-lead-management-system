import React, { useState, useEffect } from 'react';
import NotesHeader from '../../components/notes/NotesHeader';
import NotesStatsCards from '../../components/notes/NotesStatsCards';
import NotesFilterBar from '../../components/notes/NotesFilterBar';
import NotesTable from '../../components/notes/NotesTable';
import NotesViewModal from '../../components/notes/NotesViewModal';
import NotesEditModal from '../../components/notes/NotesEditModal';
import NotesDeleteModal from '../../components/notes/NotesDeleteModal';
import NotesAddModal from '../../components/notes/NotesAddModal';
import { getNotes, getNoteStats, updateNote } from '../../services/noteService';
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

  // --- FETCH DATA ON MOUNT ---
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch both stats and table data at the exact same time
      const [statsRes, notesRes] = await Promise.all([
        getNoteStats(),
        getNotes({ page: 1, limit: 10 })
      ]);

      setStats(statsRes.data);
      setNotes(notesRes.data.data);
      setPagination(notesRes.data.pagination);
    } catch (error) {
      console.error("Error fetching notes data:", error);
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

    // NEW: Real Pin / Unpin Functionality
    if (action === 'pin') {
      try {
        // Toggle the isPinned status in the backend database
        await updateNote(note._id, { isPinned: !note.isPinned });
        fetchData(); // Instantly refresh the UI to show the new pinned badge
      } catch (error) {
        console.error("Error pinning note:", error);
      }
    }
  };

  return (
    <div className="notes-container">
      <NotesHeader
        onAddNote={() => handleAction('add', null)}
        onExport={() => console.log('Exporting Notes')}
      />

      {/* We are now passing the real stats data down to the cards! */}
      <NotesStatsCards stats={stats} loading={loading} />

      <NotesFilterBar />

      <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', minWidth: 0 }}>
        {/* We are now passing real table data down to the table! */}
        <NotesTable
          notes={notes}
          loading={loading}
          pagination={pagination}
          onAction={handleAction}
        />
      </div>

      {/* Modals */}
      <NotesViewModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} note={selectedNote} />
      <NotesEditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} note={selectedNote} />
      <NotesDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} note={selectedNote} />
      <NotesAddModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          fetchData(); // Automatically refresh data after a new note is added
        }}
      />
    </div>
  );
};
