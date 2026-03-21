import { apiClient } from "@/lib/apiClient";

// 🔑 Forgot Password
export const forgotPassword = (data) => {
    return apiClient("/api/auth/forgot-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};