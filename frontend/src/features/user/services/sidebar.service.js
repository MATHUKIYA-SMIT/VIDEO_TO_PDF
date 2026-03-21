import { apiClient } from "@/lib/apiClient";

export const getUsage = async () => {
    const res = await apiClient("/api/usage");
    return res.data;
};