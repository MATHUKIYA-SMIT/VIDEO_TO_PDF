import { apiClient } from "@/lib/apiClient";

// 🔐 Login
export const login = (data) => {
    return apiClient("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

// 🔐 Google Login
export const googleLogin = (token) => {
    return apiClient("/api/auth/google", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    });
};

// 📝 Signup
export const signup = (data) => {
    return apiClient("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

// 🚪 Logout
export const logout = () => {
    return apiClient("/api/auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// 👤 Check Current User
export const checkAuth = async () => {
    try {
        return await apiClient("/api/user/me");
    } catch {
        return null; // if 401 → not logged-in as user is guest.
    }
};