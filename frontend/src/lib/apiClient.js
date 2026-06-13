export const apiClient = async (endpoint, options = {}) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, {
        credentials: "include",
        ...options,
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Something Went Wrong !!");
    }

    return result;
};