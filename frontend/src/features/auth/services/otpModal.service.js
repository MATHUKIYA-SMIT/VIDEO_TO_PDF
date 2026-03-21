import { apiClient } from "@/lib/apiClient";

// ✅ Verify Signup OTP
export const verifySignupOTP = (data) => {
    return apiClient("/api/auth/verify-otp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

// ✅ Verify Reset Password OTP
export const verifyResetOTP = (data) => {
    return apiClient("/api/auth/verify-reset-otp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

// ✅ Resend OTP
export const resendOTP = (data) => {
    return apiClient("/api/auth/resend-otp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

// ✅ Cancel Signup
export const cancelSignup = (data) => {
    return apiClient("/api/auth/cancel-signup", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};