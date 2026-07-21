import React, { useState, useEffect } from 'react';
import ActivityTimelineHeader from '../../components/activityTimeline/ActivityTimelineHeader';
import ActivityTimelineStatsCards from '../../components/activityTimeline/ActivityTimelineStatsCards';
import ActivityTimelineFilterBar from '../../components/activityTimeline/ActivityTimelineFilterBar';
import ActivityTimelineList from '../../components/activityTimeline/ActivityTimelineList';
import ActivityTimelineViewModal from '../../components/activityTimeline/ActivityTimelineViewModal';
import { getActivities, getActivityStats } from '../../services/activityService';
import { toast } from 'react-toastify';
import './activityTimeline.css';

export const ActivityTimeline = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // --- FILTER STATE ---
  const [filters, setFilters] = useState({});

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // --- FETCH DATA ON MOUNT AND WHEN FILTERS CHANGE ---
  useEffect(() => {
    fetchData();
  }, [filters]);

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
        getActivities({ page: 1, limit: 50, ...filters }) // Pass filters to API
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

  const handleAction = async (action, item) => {
    if (action === 'view') {
      setSelectedActivity(item);
      setIsViewModalOpen(true);
    } else if (action === 'copy') {
      try {
        const textToCopy = `Activity: ${item.title}\nPerformed By: ${item.createdBy || 'System'}\nRelated Record: ${item.entity}\nModule: ${item.module}\nDescription: ${item.description}`;
        await navigator.clipboard.writeText(textToCopy);
        toast.success("Activity details copied to clipboard!");
      } catch (err) {
        console.error('Failed to copy text: ', err);
        toast.error("Failed to copy activity details.");
      }
    }
  };

  const handleRefresh = async () => {
    await fetchData(); // Wait for data to fetch
    toast.success("Timeline Refreshed!");
  };

  const handleExport = () => {
    try {
      if (!data || data.length === 0) {
        toast.warning("No logs to export!");
        return;
      }

      // 1. Define CSV headers
      const headers = ['Date', 'Time', 'Activity', 'Performed By', 'Related Record', 'Module', 'Description'];
      
      // 2. Flatten data and map to rows
      const rows = [];
      data.forEach(group => {
        group.items.forEach(item => {
          // Escape quotes in strings to prevent CSV breaking
          const escapeCsv = (str) => {
            if (!str) return '""';
            return `"${String(str).replace(/"/g, '""')}"`;
          };

          rows.push([
            escapeCsv(group.date),
            escapeCsv(item.time),
            escapeCsv(item.title),
            escapeCsv(item.createdBy || 'System'),
            escapeCsv(item.entity),
            escapeCsv(item.module),
            escapeCsv(item.description)
          ]);
        });
      });

      // 3. Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');

      // 4. Create Blob and trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `activity_logs_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Logs exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export logs.");
    }
  };

  return (
    <div className="timeline-container">
      <ActivityTimelineHeader
        onExport={handleExport}
        onRefresh={handleRefresh}
      />

      {/* Pass the real stats down to the cards */}
      <ActivityTimelineStatsCards stats={stats} loading={loading} />

      <ActivityTimelineFilterBar 
        filters={filters} 
        setFilters={setFilters} 
      />

      <div style={{ width: '100%', maxWidth: '100%', minWidth: 0 }}>
        <ActivityTimelineList 
          data={data} 
          loading={loading} 
          onAction={handleAction} 
          onRefresh={handleRefresh} 
          filters={filters} 
          setFilters={setFilters} 
        />
      </div>

      <ActivityTimelineViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        activity={selectedActivity}
      />
    </div>
  );
};
