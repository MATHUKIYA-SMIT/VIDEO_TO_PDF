import toast from "react-hot-toast";
import * as dashboardStatsService from "@/features/admin/services/dashboardStats.service";

export const fetchDashboardStats = async (setStats, setLoading) => {
    try {
        setLoading(true);
        const data = await dashboardStatsService.fetchDashboardStats();
        setStats(data);
    } catch (error) {
        toast.error( error.message || "Failed to fetch dashboard stats...");
    } finally {
        setLoading(false);
    }
};