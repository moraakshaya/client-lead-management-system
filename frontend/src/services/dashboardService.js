import api from "../api/axios";

export const getDashboardStats = () => api.get("/dashboard/stats");
export const getChartData = (timeRange) => api.get(`/dashboard/charts${timeRange ? `?timeRange=${timeRange}` : ''}`);
export const getRecentWork = () => api.get("/dashboard/recent-work");
export const getRecentActivities = () => api.get("/activity?limit=5");
