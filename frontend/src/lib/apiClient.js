const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = async (endpoint, options = {}) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        credentials: "include",
        ...options,
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Something Went Wrong !!");
    }

    return result;
};