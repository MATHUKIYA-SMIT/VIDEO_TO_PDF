import { apiClient } from "@/lib/apiClient";

// Fetch Admin Dashboard Stats
export const fetchDashboardStats = async () => {
    const result = await apiClient("/api/admin/dashboard/stats");
    return result.data; // normalize response here
};