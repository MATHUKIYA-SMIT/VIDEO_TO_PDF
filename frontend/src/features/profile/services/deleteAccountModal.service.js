import { apiClient } from "@/lib/apiClient";

export const deleteAccount = () => {
    return apiClient("/api/user/profile", {
        method: "DELETE",
    });
};