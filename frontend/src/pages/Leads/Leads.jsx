import React, { useState, useEffect } from "react";
import LeadsHeader from "../../components/leads/LeadsHeader";
import LeadsStatsCards from "../../components/leads/LeadsStatsCards";
import LeadsFilterBar from "../../components/leads/LeadsFilterBar";
import LeadsTable from "../../components/leads/LeadsTable";
import AddLeadModal from "../../components/leads/AddLeadModal";
import EditLeadDrawer from "../../components/leads/EditLeadDrawer";
import ViewLeadModal from "../../components/leads/ViewLeadModal";
import DeleteLeadModal from "../../components/leads/DeleteLeadModal";
import AddNoteModal from "../../components/clients/AddNoteModal";
import ScheduleFollowupModal from "../../components/clients/ScheduleFollowupModal";
import ConvertToClientModal from "../../components/leads/ConvertToClientModal";
import { getLeads, getLeadStats, getLeadFilterOptions } from "../../services/leadService";
import { handleApiError } from "../../utils/errorHandler";

export function Leads() {
    const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);

    // Data State
    const [leads, setLeads] = useState([]);
    const [stats, setStats] = useState(null);
    const [filterOptions, setFilterOptions] = useState({ status: [], priority: [], source: [], assignedUser: [] });
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ currentPage: 1, limit: 10, totalPages: 1, totalLeads: 0 });
    const [filters, setFilters] = useState({});

    const fetchDashboardData = async (page = 1) => {
        try {
            setLoading(true);
            const [leadsRes, statsRes, optionsRes] = await Promise.all([
                getLeads({ page, limit: pagination.limit, ...filters }),
                getLeadStats(),
                getLeadFilterOptions()
            ]);
            
            setLeads(leadsRes.data.leads || []);
            setPagination(leadsRes.data.pagination || { currentPage: 1, limit: 10, totalPages: 1, totalLeads: 0 });
            setStats(statsRes.data || null);
            setFilterOptions(optionsRes.data || { status: [], priority: [], source: [], assignedUser: [] });
        } catch (error) {
            handleApiError(error, 'fetchLeads');
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

    const handleEditLead = (lead) => {
        setSelectedLead(lead);
        setIsEditDrawerOpen(true);
    };

    const handleViewLead = (lead) => {
        setSelectedLead(lead);
        setIsViewModalOpen(true);
    };

    const handleDeleteLead = (lead) => {
        setSelectedLead(lead);
        setIsDeleteModalOpen(true);
    };

    const handleAddNote = (lead) => {
        setSelectedLead(lead);
        setIsAddNoteModalOpen(true);
    };

    const handleSchedule = (lead) => {
        setSelectedLead(lead);
        setIsScheduleModalOpen(true);
    };

    const handleConvert = (lead) => {
        setSelectedLead(lead);
        setIsConvertModalOpen(true);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', minWidth: 0, maxWidth: '100%' }}>
            <LeadsHeader onAddLead={() => setIsAddLeadModalOpen(true)} />
            <LeadsStatsCards stats={stats} loading={loading} />
            <LeadsFilterBar 
                filters={filters} 
                setFilters={setFilters} 
                filterOptions={filterOptions} 
            />
            <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', minWidth: 0 }}>
                <LeadsTable 
                    leads={leads}
                    loading={loading}
                    pagination={pagination}
                    filters={filters}
                    setFilters={setFilters}
                    onPageChange={handlePageChange}
                    onEditLead={handleEditLead} 
                    onViewLead={handleViewLead}
                    onDeleteLead={handleDeleteLead}
                    onAddNote={handleAddNote}
                    onSchedule={handleSchedule}
                    onConvert={handleConvert}
                />
            </div>

            <AddLeadModal 
                isOpen={isAddLeadModalOpen} 
                onClose={() => setIsAddLeadModalOpen(false)} 
                onSuccess={handleRefresh}
            />

            <EditLeadDrawer 
                isOpen={isEditDrawerOpen}
                onClose={() => setIsEditDrawerOpen(false)}
                lead={selectedLead}
                onSuccess={handleRefresh}
            />

            <ViewLeadModal 
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                lead={selectedLead}
            />

            <DeleteLeadModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                lead={selectedLead}
                onSuccess={handleRefresh}
            />

            <AddNoteModal 
                isOpen={isAddNoteModalOpen} 
                onClose={() => setIsAddNoteModalOpen(false)} 
                client={selectedLead}
                modelType="Lead"
                onSuccess={handleRefresh}
            />

            <ScheduleFollowupModal 
                isOpen={isScheduleModalOpen} 
                onClose={() => setIsScheduleModalOpen(false)} 
                client={selectedLead} 
                onSuccess={handleRefresh}
            />

            <ConvertToClientModal 
                isOpen={isConvertModalOpen} 
                onClose={() => setIsConvertModalOpen(false)} 
                lead={selectedLead} 
                onSuccess={handleRefresh}
            />
        </div>
    )
}
