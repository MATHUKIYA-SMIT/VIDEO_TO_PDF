import { apiClient } from "@/lib/apiClient";

export const convertVideo = (payload) => {
    return apiClient("/api/video/convert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
};