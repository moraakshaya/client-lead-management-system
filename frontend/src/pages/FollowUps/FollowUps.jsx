import React, { useState, useEffect } from 'react';
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
import './followUps.css';

export const FollowUps = () => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMarkCompletedOpen, setIsMarkCompletedOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const [selectedFollowUp, setSelectedFollowUp] = useState(null);

  // --- NEW STATE FOR REAL DATA ---
  const [stats, setStats] = useState(null);
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

  // --- FETCH DATA ON MOUNT ---
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch stats and table data at the exact same time for speed
      const [statsRes, followUpsRes] = await Promise.all([
        getFollowUpStats(),
        getFollowUps({ page: 1, limit: 10 })
      ]);

      setStats(statsRes.data);
      setFollowUps(followUpsRes.data.data);
      setPagination(followUpsRes.data.pagination);
    } catch (error) {
      console.error("Error fetching follow-up data:", error);
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

      <FollowUpsFilterBar />
      <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', minWidth: 0 }}>

        {/* We are now passing real table data down to the table! */}
        <FollowUpsTable
          followUps={followUps}
          loading={loading}
          pagination={pagination}
          onAction={handleAction}
        />

      </div>

      <FollowUpsViewModal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} followUp={selectedFollowUp} />
      <FollowUpsEditModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} followUp={selectedFollowUp} />
      <FollowUpsMarkCompletedModal isOpen={isMarkCompletedOpen} onClose={() => setIsMarkCompletedOpen(false)} followUp={selectedFollowUp} />
      <FollowUpsAddNoteModal isOpen={isAddNoteOpen} onClose={() => setIsAddNoteOpen(false)} followUp={selectedFollowUp} />
      <FollowUpsDeleteModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} followUp={selectedFollowUp} />
      <FollowUpsScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => {
          setIsScheduleOpen(false);
          fetchData(); // Automatically refresh data after a new follow-up is scheduled
        }}
      />
    </div>
  );
};
