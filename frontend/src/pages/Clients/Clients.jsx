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
import { handleApiError } from "../../utils/errorHandler";
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
    const [tableLoading, setTableLoading] = useState(true);
    const [statsLoading, setStatsLoading] = useState(true);
    const [pagination, setPagination] = useState({ currentPage: 1, limit: 10, totalPages: 1, totalClients: 0 });
    const [filters, setFilters] = useState({});

    const fetchDashboardData = async (page = 1, fetchStats = false) => {
        try {
            setTableLoading(true);
            if (fetchStats) setStatsLoading(true);
            
            const promises = [
                getClients({ page, limit: pagination.limit, ...filters })
            ];
            if (fetchStats) promises.push(getClientStats());

            const results = await Promise.all(promises);
            const clientsRes = results[0];
            
            setClients(clientsRes.data.clients || []);
            setPagination(clientsRes.data.pagination || { currentPage: 1, limit: 10, totalPages: 1, totalClients: 0 });
            
            if (fetchStats) {
                setStats(results[1].data || null);
            }
        } catch (error) {
            handleApiError(error, 'fetchClients');
        } finally {
            setTableLoading(false);
            if (fetchStats) setStatsLoading(false);
        }
    };

    useEffect(() => {
        // Only fetch stats on initial mount, not on every filter change
        const isInitial = !stats;
        fetchDashboardData(pagination.currentPage, isInitial);
    }, [pagination.currentPage, filters]); // Re-fetch when page or filters change

    const handleRefresh = () => {
        fetchDashboardData(pagination.currentPage, true);
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
            <ClientsHeader onRefresh={handleRefresh} />
            <ClientsStatsCards stats={stats} loading={statsLoading} />
            <ClientsFilterBar filters={filters} setFilters={setFilters} />
            <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', minWidth: 0 }}>
                <ClientsTable 
                    clients={clients}
                    loading={tableLoading}
                    pagination={pagination}
                    filters={filters}
                    setFilters={setFilters}
                    onPageChange={handlePageChange}
                    onEditClient={handleEditClient} 
                    onViewClient={handleViewClient}
                    onDeleteClient={handleDelete}
                    onAddNote={handleAddNote}
                    onSchedule={handleSchedule}
                />
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
                modelType="Client"
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
    );
}
