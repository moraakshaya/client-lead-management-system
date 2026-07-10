import React, { useState } from "react";
import ClientsHeader from "../../components/clients/ClientsHeader";
import ClientsStatsCards from "../../components/clients/ClientsStatsCards";
import ClientsFilterBar from "../../components/clients/ClientsFilterBar";
import ClientsTable from "../../components/clients/ClientsTable";
import ViewClientModal from "../../components/clients/ViewClientModal";
import EditClientModal from "../../components/clients/EditClientModal";
import AddNoteModal from "../../components/clients/AddNoteModal";
import ScheduleFollowupModal from "../../components/clients/ScheduleFollowupModal";
import DeleteClientModal from "../../components/clients/DeleteClientModal";

export function Clients() {
    const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const handleViewClient = (client) => {
        setSelectedClient(client);
        setIsViewDrawerOpen(true);
    };

    const handleEditClient = (client) => {
        setSelectedClient(client);
        setIsEditModalOpen(true);
    };

    const handleAddNote = (client) => {
        setSelectedClient(client);
        setIsAddNoteModalOpen(true);
    };

    const handleSchedule = (client) => {
        setSelectedClient(client);
        setIsScheduleModalOpen(true);
    };

    const handleDelete = (client) => {
        setSelectedClient(client);
        setIsDeleteModalOpen(true);
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', minWidth: 0, maxWidth: '100%' }}>
            <ClientsHeader onAddClient={() => {}} />
            <ClientsStatsCards />
            <ClientsFilterBar />
            <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', minWidth: 0 }}>
                <ClientsTable onViewClient={handleViewClient} onEditClient={handleEditClient} onAddNote={handleAddNote} onSchedule={handleSchedule} onDeleteClient={handleDelete} />
            </div>

            <ViewClientModal 
                isOpen={isViewDrawerOpen} 
                onClose={() => setIsViewDrawerOpen(false)} 
                client={selectedClient} 
            />

            <EditClientModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                client={selectedClient} 
            />

            <AddNoteModal 
                isOpen={isAddNoteModalOpen} 
                onClose={() => setIsAddNoteModalOpen(false)} 
                client={selectedClient} 
            />

            <ScheduleFollowupModal 
                isOpen={isScheduleModalOpen} 
                onClose={() => setIsScheduleModalOpen(false)} 
                client={selectedClient} 
            />

            <DeleteClientModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                client={selectedClient} 
            />
        </div>
    )
}
