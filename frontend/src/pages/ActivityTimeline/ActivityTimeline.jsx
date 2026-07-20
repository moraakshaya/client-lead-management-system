import React, { useState, useEffect } from 'react';
import ActivityTimelineHeader from '../../components/activityTimeline/ActivityTimelineHeader';
import ActivityTimelineStatsCards from '../../components/activityTimeline/ActivityTimelineStatsCards';
import ActivityTimelineFilterBar from '../../components/activityTimeline/ActivityTimelineFilterBar';
import ActivityTimelineList from '../../components/activityTimeline/ActivityTimelineList';
import ActivityTimelineViewModal from '../../components/activityTimeline/ActivityTimelineViewModal';
import { getActivities, getActivityStats } from '../../services/activityService';
import './activityTimeline.css';

export const ActivityTimeline = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // --- FETCH DATA ON MOUNT ---
  useEffect(() => {
    fetchData();
  }, []);

  // --- HELPER FUNCTION TO GROUP DATA ---
  const groupActivitiesByDate = (activities) => {
    const grouped = {};
    const today = new Date().toDateString();

    // Figure out exactly what yesterday was
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toDateString();

    // Loop through the flat array from the backend
    activities.forEach(activity => {
      const activityDateObj = new Date(activity.createdAt);
      const activityDateStr = activityDateObj.toDateString();

      let dateLabel = '';
      if (activityDateStr === today) {
        dateLabel = 'TODAY';
      } else if (activityDateStr === yesterday) {
        dateLabel = 'YESTERDAY';
      } else {
        // e.g. "15 JUL 2026"
        dateLabel = activityDateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
      }

      // Create the group if it doesn't exist yet
      if (!grouped[dateLabel]) {
        grouped[dateLabel] = [];
      }

      const time = activityDateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

      // Find the correct name
      const entity = activity.leadId ? (activity.leadId.leadName || activity.leadId.companyName)
        : activity.ClientId ? (activity.ClientId.clientName || activity.ClientId.companyName)
          : 'System';

      // Push the formatted data into the correct date group
      grouped[dateLabel].push({
        ...activity,
        title: activity.action,
        time,
        entity,
        itemDate: dateLabel
      });
    });

    // Convert the object into the Array format that the Timeline List component expects
    return Object.keys(grouped).map(date => ({
      date,
      items: grouped[date]
    }));
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const [statsRes, activitiesRes] = await Promise.all([
        getActivityStats(),
        getActivities({ page: 1, limit: 50 }) // Fetch up to 50 activities to fill the timeline
      ]);

      setStats(statsRes.data);

      // Pass the raw data through our grouping function before saving it to state!
      const groupedData = groupActivitiesByDate(activitiesRes.data.data);
      setData(groupedData);

    } catch (error) {
      console.error('Error fetching timeline data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (action, item) => {
    if (action === 'view') {
      setSelectedActivity(item);
      setIsViewModalOpen(true);
    } else if (action === 'copy') {
      alert(`Copied activity: ${item.title}`);
    }
  };

  const handleRefresh = () => {
    fetchData(); // Use the actual API fetch instead of fake data
  };

  return (
    <div className="timeline-container">
      <ActivityTimelineHeader
        onExport={() => console.log('Exporting Logs')}
        onRefresh={handleRefresh}
      />

      {/* Pass the real stats down to the cards */}
      <ActivityTimelineStatsCards stats={stats} loading={loading} />

      <ActivityTimelineFilterBar />

      <div style={{ width: '100%', maxWidth: '100%', minWidth: 0 }}>
        <ActivityTimelineList data={data} loading={loading} onAction={handleAction} onRefresh={handleRefresh} />
      </div>

      <ActivityTimelineViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        activity={selectedActivity}
      />
    </div>
  );
};
