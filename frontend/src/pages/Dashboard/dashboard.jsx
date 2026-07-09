import React from "react";
import { Link } from "react-router-dom";
import Welcome from "../../components/dashboard/Welcome";
import StatsCards from "../../components/dashboard/StatsCards";
import LeadAnalytics from "../../components/dashboard/LeadAnalytics";
import WorkItems from "../../components/dashboard/WorkItems";
import Operations from "../../components/dashboard/Operations";
import Performance from "../../components/dashboard/Performance";

export function Dashboard() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <Welcome />
            <StatsCards />
            <LeadAnalytics />
            <WorkItems />
            <Operations />
            <Performance />
        </div>
    )
}