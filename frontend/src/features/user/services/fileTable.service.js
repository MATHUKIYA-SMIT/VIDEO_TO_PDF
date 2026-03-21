import { apiClient } from "@/lib/apiClient";

export const getUserVideos = async () => {
    const res = await apiClient("/api/video", {
        method: "GET",
    });

    return res.data;
};