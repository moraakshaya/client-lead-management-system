import React, { useState, useEffect } from "react";
import ClientsHeader from "../../components/clients/ClientsHeader";
import ClientsStatsCards from "../../components/clients/ClientsStatsCards";
import ClientsFilterBar from "../../components/clients/ClientsFilterBar";
import ClientsTable from "../../components/clients/ClientsTable";
import ViewClientModal from "../../components/clients/ViewClientModal";
import EditClientModal from "../../components/clients/EditClientModal";
import AddNoteModal from "../../components/clients/AddNoteModal";
import ScheduleFollowupModal from "../../components/clients/ScheduleFollowupModal";
import DeleteClientModal from "../../components/clients/DeleteClientModal";
import { getClients, getClientStats } from "../../services/clientService";

export function Clients() {
    const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    // Data State
    const [clients, setClients] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ currentPage: 1, limit: 10, totalPages: 1, totalClients: 0 });
    const [filters, setFilters] = useState({});

    const fetchDashboardData = async (page = 1) => {
        try {
            setLoading(true);
            const [clientsRes, statsRes] = await Promise.all([
                getClients({ page, limit: pagination.limit, ...filters }),
                getClientStats()
            ]);
            
            setClients(clientsRes.data.clients || []);
            setPagination(clientsRes.data.pagination || { currentPage: 1, limit: 10, totalPages: 1, totalClients: 0 });
            setStats(statsRes.data || null);
        } catch (error) {
            console.error("Error fetching clients data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData(pagination.currentPage);
    }, [pagination.currentPage, filters]); // Re-fetch when page or filters change

    const handleRefresh = () => {
        fetchDashboardData(pagination.currentPage);
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, currentPage: newPage }));
    };

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
            <ClientsStatsCards stats={stats} loading={loading} />
            <ClientsFilterBar onFilterChange={(newFilters) => setFilters(newFilters)} />
            <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', minWidth: 0 }}>
                {loading && clients.length === 0 ? (
                    <div style={{ padding: '20px', color: 'var(--text-secondary)' }}>Loading clients...</div>
                ) : (
                    <ClientsTable 
                        clients={clients}
                        pagination={pagination}
                        onPageChange={handlePageChange}
                        onViewClient={handleViewClient} 
                        onEditClient={handleEditClient} 
                        onAddNote={handleAddNote} 
                        onSchedule={handleSchedule} 
                        onDeleteClient={handleDelete} 
                    />
                )}
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
                onSuccess={handleRefresh}
            />

            <AddNoteModal 
                isOpen={isAddNoteModalOpen} 
                onClose={() => setIsAddNoteModalOpen(false)} 
                client={selectedClient} 
                onSuccess={handleRefresh}
            />

            <ScheduleFollowupModal 
                isOpen={isScheduleModalOpen} 
                onClose={() => setIsScheduleModalOpen(false)} 
                client={selectedClient} 
                onSuccess={handleRefresh}
            />

            <DeleteClientModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                client={selectedClient} 
                onSuccess={handleRefresh}
            />
        </div>
    )
}
