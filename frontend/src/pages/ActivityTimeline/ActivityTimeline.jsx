import React, { useState } from 'react';
import ActivityTimelineHeader from '../../components/activityTimeline/ActivityTimelineHeader';
import ActivityTimelineStatsCards from '../../components/activityTimeline/ActivityTimelineStatsCards';
import ActivityTimelineFilterBar from '../../components/activityTimeline/ActivityTimelineFilterBar';
import ActivityTimelineList from '../../components/activityTimeline/ActivityTimelineList';
import ActivityTimelineViewModal from '../../components/activityTimeline/ActivityTimelineViewModal';
import './activityTimeline.css';
import { 
  FaUserPlus, 
  FaUserEdit, 
  FaUserCheck, 
  FaUserCog, 
  FaCalendarPlus, 
  FaCalendarCheck, 
  FaStickyNote, 
  FaExchangeAlt, 
  FaTrashAlt, 
  FaSignInAlt
} from 'react-icons/fa';

const initialData = [
  {
    date: 'TODAY',
    items: [
      {
        id: 1,
        title: 'Lead Created',
        entity: 'John Doe',
        description: 'Created by Rahul',
        module: 'Leads Module',
        itemDate: '15 Jul 2026',
        time: '10:25 AM',
        status: 'Active',
        icon: <FaUserPlus />,
        type: 'create-lead'
      },
      {
        id: 2,
        title: 'Lead Updated',
        entity: 'Jane Smith',
        description: 'Updated phone number',
        module: 'Leads Module',
        itemDate: '15 Jul 2026',
        time: '11:15 AM',
        status: 'Updated',
        icon: <FaUserEdit />,
        type: 'update-lead'
      },
      {
        id: 3,
        title: 'Note Added',
        entity: 'John Doe',
        description: 'Added pricing discussion',
        module: 'Notes Module',
        itemDate: '15 Jul 2026',
        time: '11:20 AM',
        status: 'Added',
        icon: <FaStickyNote />,
        type: 'note'
      },
      {
        id: 4,
        title: 'Follow-up Scheduled',
        entity: 'Demo Call',
        description: 'Tomorrow at 2 PM',
        module: 'Follow-ups Module',
        itemDate: '15 Jul 2026',
        time: '1:15 PM',
        status: 'Scheduled',
        icon: <FaCalendarPlus />,
        type: 'schedule'
      },
      {
        id: 5,
        title: 'Lead Converted',
        entity: 'John Doe',
        description: 'Converted into Client',
        module: 'Leads Module',
        itemDate: '15 Jul 2026',
        time: '4:00 PM',
        status: 'Converted',
        icon: <FaExchangeAlt />,
        type: 'convert'
      },
      {
        id: 6,
        title: 'Client Created',
        entity: 'Acme Corp',
        description: 'Added as a new corporate client',
        module: 'Clients Module',
        itemDate: '15 Jul 2026',
        time: '4:30 PM',
        status: 'Active',
        icon: <FaUserCheck />,
        type: 'create-client'
      }
    ]
  },
  {
    date: 'YESTERDAY',
    items: [
      {
        id: 7,
        title: 'Client Updated',
        entity: 'Acme Corp',
        description: 'Updated billing address',
        module: 'Clients Module',
        itemDate: '14 Jul 2026',
        time: '3:30 PM',
        status: 'Updated',
        icon: <FaUserCog />,
        type: 'update-client'
      },
      {
        id: 8,
        title: 'Follow-up Completed',
        entity: 'Onboarding Call',
        description: 'Completed onboarding with Acme Corp',
        module: 'Follow-ups Module',
        itemDate: '14 Jul 2026',
        time: '5:00 PM',
        status: 'Completed',
        icon: <FaCalendarCheck />,
        type: 'complete'
      },
      {
        id: 9,
        title: 'Record Deleted',
        entity: 'Spam Lead',
        description: 'Deleted spam submission',
        module: 'Leads Module',
        itemDate: '14 Jul 2026',
        time: '6:15 PM',
        status: 'Deleted',
        icon: <FaTrashAlt />,
        type: 'delete'
      },
      {
        id: 10,
        title: 'User Logged In',
        entity: 'Rahul System',
        description: 'System login from IP 192.168.1.1',
        module: 'System Module',
        itemDate: '14 Jul 2026',
        time: '9:00 AM',
        status: 'Success',
        icon: <FaSignInAlt />,
        type: 'login'
      }
    ]
  }
];

export const ActivityTimeline = () => {
  const [data, setData] = useState(initialData);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleAction = (action, item) => {
    if (action === 'view') {
      setSelectedActivity(item);
      setIsViewModalOpen(true);
    } else if (action === 'copy') {
      alert(`Copied activity: ${item.title}`);
    }
  };

  const handleRefresh = () => {
    console.log('Refreshing Timeline...');
    // We can simulate refresh by resetting data
    setData(initialData);
  };

  return (
    <div className="timeline-container">
      <ActivityTimelineHeader 
        onExport={() => console.log('Exporting Logs')} 
        onRefresh={handleRefresh} 
      />
      <ActivityTimelineStatsCards />
      <ActivityTimelineFilterBar />
      <div style={{ width: '100%', maxWidth: '100%', minWidth: 0 }}>
        <ActivityTimelineList data={data} onAction={handleAction} onRefresh={handleRefresh} />
      </div>

      <ActivityTimelineViewModal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        activity={selectedActivity} 
      />
    </div>
  );
};
