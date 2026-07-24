import React, { useState, useEffect } from "react";
import Welcome from "../../components/dashboard/Welcome";
import StatsCards from "../../components/dashboard/StatsCards";
import LeadAnalytics from "../../components/dashboard/LeadAnalytics";
import WorkItems from "../../components/dashboard/WorkItems";
import Operations from "../../components/dashboard/Operations";
import Performance from "../../components/dashboard/Performance";
import AddLeadModal from "../../components/leads/AddLeadModal";
import FollowUpsScheduleModal from "../../components/followUps/FollowUpsScheduleModal";
import { getDashboardStats, getChartData, getRecentWork, getRecentActivities } from "../../services/dashboardService";
import { handleApiError } from "../../utils/errorHandler";

export function Dashboard() {
    const [stats, setStats] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [recentWork, setRecentWork] = useState(null);
    const [activities, setActivities] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal states
    const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
    const [isScheduleFollowupModalOpen, setIsScheduleFollowupModalOpen] = useState(false);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [statsRes, chartsRes, workRes, activitiesRes] = await Promise.all([
                getDashboardStats(),
                getChartData(),
                getRecentWork(),
                getRecentActivities()
            ]);

            setStats(statsRes.data);
            setChartData(chartsRes.data);
            setRecentWork(workRes.data);
            setActivities(activitiesRes.data.data || activitiesRes.data);
            setError(null);
        } catch (err) {
            handleApiError(err, 'fetchDashboard');
            setError("Unable to load dashboard data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--text-primary)' }}>
                <h2>Loading dashboard...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--danger)' }}>
                <h2>{error}</h2>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <Welcome />
            <StatsCards stats={stats} />
            <LeadAnalytics chartData={chartData} />
            <WorkItems recentWork={recentWork} />
            <Operations
                activities={activities}
                onAddLead={() => setIsAddLeadModalOpen(true)}
                onCreateFollowUp={() => setIsScheduleFollowupModalOpen(true)}
            />
            <Performance stats={stats} />

            <AddLeadModal
                isOpen={isAddLeadModalOpen}
                onClose={() => setIsAddLeadModalOpen(false)}
                onSuccess={fetchDashboardData}
            />

            <FollowUpsScheduleModal
                isOpen={isScheduleFollowupModalOpen}
                onClose={() => setIsScheduleFollowupModalOpen(false)}
                onSuccess={fetchDashboardData}
            />
        </div>
    )
}

export default Dashboard;