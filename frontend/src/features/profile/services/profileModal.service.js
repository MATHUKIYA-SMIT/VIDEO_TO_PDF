import { apiClient } from "@/lib/apiClient";

export const updateAvatar = (formData) => {
    return apiClient("/api/user/profile/avatar", {
        method: "PUT",
        body: formData,
    });
};

export const updateUsername = (data) => {
    return apiClient("/api/user/profile/username", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};