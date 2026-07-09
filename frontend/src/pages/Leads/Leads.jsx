import React, { useState } from "react";
import LeadsHeader from "../../components/leads/LeadsHeader";
import LeadsStatsCards from "../../components/leads/LeadsStatsCards";
import LeadsFilterBar from "../../components/leads/LeadsFilterBar";
import LeadsTable from "../../components/leads/LeadsTable";
import AddLeadModal from "../../components/leads/AddLeadModal";
import EditLeadDrawer from "../../components/leads/EditLeadDrawer";
import ViewLeadModal from "../../components/leads/ViewLeadModal";
import DeleteLeadModal from "../../components/leads/DeleteLeadModal";

export function Leads() {
    const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);

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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', minWidth: 0, maxWidth: '100%' }}>
            <LeadsHeader onAddLead={() => setIsAddLeadModalOpen(true)} />
            <LeadsStatsCards />
            <LeadsFilterBar />
            <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', minWidth: 0 }}>
                <LeadsTable 
                    onEditLead={handleEditLead} 
                    onViewLead={handleViewLead}
                    onDeleteLead={handleDeleteLead}
                />
            </div>

            <AddLeadModal 
                isOpen={isAddLeadModalOpen} 
                onClose={() => setIsAddLeadModalOpen(false)} 
            />

            <EditLeadDrawer 
                isOpen={isEditDrawerOpen}
                onClose={() => setIsEditDrawerOpen(false)}
                lead={selectedLead}
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
            />
        </div>
    )
}
