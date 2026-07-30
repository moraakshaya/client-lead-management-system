import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import ImportLeadModal from "../../components/leads/ImportLeadModal";
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
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.openAddModal) {
            setIsAddLeadModalOpen(true);
            // Clear the state so it doesn't reopen on refresh
            window.history.replaceState({}, document.title)
        }
    }, [location.state]);

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

    const handleExport = async () => {
        try {
            toast.info("Preparing export...");
            // Fetch all leads matching current filters by passing a massive limit
            const response = await getLeads({ page: 1, limit: 10000, ...filters });
            const leadsToExport = response.data.leads || [];

            if (leadsToExport.length === 0) {
                toast.warning("No leads found to export.");
                return;
            }

            // Define CSV headers
            const headers = ['Lead Name', 'Company Name', 'Email', 'Phone', 'Status', 'Priority', 'Source', 'Address', 'Created Date'];
            
            // Flatten data and map to rows
            const rows = leadsToExport.map(lead => {
                const escapeCsv = (str) => {
                    if (!str) return '""';
                    return `"${String(str).replace(/"/g, '""')}"`;
                };

                return [
                    escapeCsv(lead.leadName),
                    escapeCsv(lead.companyName),
                    escapeCsv(lead.email),
                    escapeCsv(lead.phone),
                    escapeCsv(lead.status),
                    escapeCsv(lead.priority),
                    escapeCsv(lead.source),
                    escapeCsv(lead.address),
                    escapeCsv(new Date(lead.createdAt).toLocaleDateString())
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
            link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            toast.success("Leads exported successfully!");
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Failed to export leads.");
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', minWidth: 0, maxWidth: '100%' }}>
            <LeadsHeader 
                onAddLead={() => setIsAddLeadModalOpen(true)} 
                onExport={handleExport} 
                onImport={() => setIsImportModalOpen(true)} 
            />
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

            <ImportLeadModal 
                isOpen={isImportModalOpen} 
                onClose={() => setIsImportModalOpen(false)} 
                onSuccess={handleRefresh}
            />
        </div>
    )
}
