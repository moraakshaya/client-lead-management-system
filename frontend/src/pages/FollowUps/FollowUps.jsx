import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FollowUpsHeader from '../../components/followUps/FollowUpsHeader';
import FollowUpsStatsCards from '../../components/followUps/FollowUpsStatsCards';
import FollowUpsFilterBar from '../../components/followUps/FollowUpsFilterBar';
import FollowUpsTable from '../../components/followUps/FollowUpsTable';
import FollowUpsViewModal from '../../components/followUps/FollowUpsViewModal';
import FollowUpsEditModal from '../../components/followUps/FollowUpsEditModal';
import FollowUpsMarkCompletedModal from '../../components/followUps/FollowUpsMarkCompletedModal';
import FollowUpsAddNoteModal from '../../components/followUps/FollowUpsAddNoteModal';
import FollowUpsDeleteModal from '../../components/followUps/FollowUpsDeleteModal';
import FollowUpsScheduleModal from '../../components/followUps/FollowUpsScheduleModal';
import { getFollowUps, getFollowUpStats } from '../../services/followUpService';
import { getLeadFilterOptions } from '../../services/leadService';
import { handleApiError } from '../../utils/errorHandler';
import './followUps.css';

export const FollowUps = () => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMarkCompletedOpen, setIsMarkCompletedOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const [selectedFollowUp, setSelectedFollowUp] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.openScheduleModal) {
      setIsScheduleOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // --- NEW STATE FOR REAL DATA ---
  const [stats, setStats] = useState(null);
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({ assignedUser: [] });

  // --- FETCH DATA ON MOUNT AND ON FILTER CHANGE ---
  useEffect(() => {
    fetchData();
  }, [filters, pagination.currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch stats and table data at the exact same time for speed
      const [statsRes, followUpsRes, optionsRes] = await Promise.all([
        getFollowUpStats(),
        getFollowUps({ page: pagination.currentPage, limit: 10, ...filters }),
        getLeadFilterOptions()
      ]);

      setStats(statsRes.data);
      setFollowUps(followUpsRes.data.data);
      setPagination(followUpsRes.data.pagination);
      setFilterOptions(optionsRes.data || { assignedUser: [] });
    } catch (error) {
      handleApiError(error, 'fetchFollowUps');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (action, followUp) => {
    setSelectedFollowUp(followUp);
    switch (action) {
      case 'view': setIsViewOpen(true); break;
      case 'edit': setIsEditOpen(true); break;
      case 'complete': setIsMarkCompletedOpen(true); break;
      case 'note': setIsAddNoteOpen(true); break;
      case 'delete': setIsDeleteOpen(true); break;
      default: break;
    }
  };

  return (
    <div className="follow-ups-container">
      <FollowUpsHeader onSchedule={() => setIsScheduleOpen(true)} />

      {/* We are now passing the real stats data down to the cards! */}
      <FollowUpsStatsCards stats={stats} loading={loading} />

      <FollowUpsFilterBar filters={filters} setFilters={setFilters} filterOptions={filterOptions} />
      <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', minWidth: 0 }}>

        {/* We are now passing real table data down to the table! */}
        <FollowUpsTable
          followUps={followUps}
          loading={loading}
          pagination={pagination}
          onAction={handleAction}
          filters={filters}
          setFilters={setFilters}
        />

      </div>

      <FollowUpsViewModal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} followUp={selectedFollowUp} />
      <FollowUpsEditModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        followUp={selectedFollowUp} 
        users={filterOptions.assignedUser} 
        onSuccess={() => fetchData()}
      />
      <FollowUpsMarkCompletedModal 
        isOpen={isMarkCompletedOpen} 
        onClose={() => setIsMarkCompletedOpen(false)} 
        followUp={selectedFollowUp} 
        onSuccess={() => fetchData()}
      />
      <FollowUpsAddNoteModal 
        isOpen={isAddNoteOpen} 
        onClose={() => setIsAddNoteOpen(false)} 
        followUp={selectedFollowUp} 
        onSuccess={() => fetchData()}
      />
      <FollowUpsDeleteModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        followUp={selectedFollowUp} 
        onSuccess={() => fetchData()}
      />
      <FollowUpsScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onSuccess={() => fetchData()}
        users={filterOptions.assignedUser}
      />
    </div>
  );
};
