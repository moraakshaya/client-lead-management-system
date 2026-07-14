import React, { useState } from 'react';
import NotesHeader from '../../components/notes/NotesHeader';
import NotesStatsCards from '../../components/notes/NotesStatsCards';
import NotesFilterBar from '../../components/notes/NotesFilterBar';
import NotesTable from '../../components/notes/NotesTable';
import NotesViewModal from '../../components/notes/NotesViewModal';
import NotesEditModal from '../../components/notes/NotesEditModal';
import NotesDeleteModal from '../../components/notes/NotesDeleteModal';
import NotesAddModal from '../../components/notes/NotesAddModal';
import './notes.css';

export const Notes = () => {
  const [notes, setNotes] = useState([
    {
      id: "NT-001",
      title: "Demo Discussion",
      relatedTo: "John Doe",
      type: "Lead",
      createdBy: "Rahul",
      createdDate: "20 Jul 2026",
      status: "Pinned"
    },
    {
      id: "NT-002",
      title: "Pricing Negotiation",
      relatedTo: "Acme Corp",
      type: "Client",
      createdBy: "Sarah",
      createdDate: "21 Jul 2026",
      status: "Active"
    }
  ]);

  const [selectedNote, setSelectedNote] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAction = (action, note) => {
    setSelectedNote(note);
    if (action === 'view') setIsViewModalOpen(true);
    if (action === 'edit') setIsEditModalOpen(true);
    if (action === 'delete') setIsDeleteModalOpen(true);
    if (action === 'add') setIsAddModalOpen(true);
    if (action === 'pin') {
      setNotes(prev => prev.map(n => {
        if (n.id === note.id) {
          return { ...n, status: n.status === 'Pinned' ? 'Active' : 'Pinned' };
        }
        return n;
      }));
    }
  };

  return (
    <div className="notes-container">
      <NotesHeader 
        onAddNote={() => handleAction('add', null)} 
        onExport={() => console.log('Exporting Notes')} 
      />
      <NotesStatsCards />
      <NotesFilterBar />
      <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', minWidth: 0 }}>
        <NotesTable notes={notes} onAction={handleAction} />
      </div>

      {/* Modals */}
      <NotesViewModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} note={selectedNote} />
      <NotesEditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} note={selectedNote} />
      <NotesDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} note={selectedNote} />
      <NotesAddModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};
