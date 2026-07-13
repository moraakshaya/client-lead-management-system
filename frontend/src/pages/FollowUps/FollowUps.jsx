import React, { useState } from 'react';
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
import './followUps.css';

export const FollowUps = () => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMarkCompletedOpen, setIsMarkCompletedOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  
  const [selectedFollowUp, setSelectedFollowUp] = useState(null);

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
      <FollowUpsStatsCards />
      <FollowUpsFilterBar />
      <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', minWidth: 0 }}>
        <FollowUpsTable onAction={handleAction} />
      </div>

      <FollowUpsViewModal 
        isOpen={isViewOpen} 
        onClose={() => setIsViewOpen(false)} 
        followUp={selectedFollowUp} 
      />
      <FollowUpsEditModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        followUp={selectedFollowUp} 
      />
      <FollowUpsMarkCompletedModal 
        isOpen={isMarkCompletedOpen} 
        onClose={() => setIsMarkCompletedOpen(false)} 
        followUp={selectedFollowUp} 
      />
      <FollowUpsAddNoteModal 
        isOpen={isAddNoteOpen} 
        onClose={() => setIsAddNoteOpen(false)} 
        followUp={selectedFollowUp} 
      />
      <FollowUpsDeleteModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        followUp={selectedFollowUp} 
      />
      <FollowUpsScheduleModal 
        isOpen={isScheduleOpen} 
        onClose={() => setIsScheduleOpen(false)} 
      />
    </div>
  );
};
