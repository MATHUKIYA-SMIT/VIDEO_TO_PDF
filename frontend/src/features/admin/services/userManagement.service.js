import { apiClient } from "@/lib/apiClient";

// ✅ Fetch users whose review is pending
export const fetchPendingReviewUsers = async () => {
    const result = await apiClient("/api/admin/users/pending-review");
    return result.data; // normalize here
};

// ✅ Fetch users whose review is approved
export const fetchApprovedReviewUsers = async () => {
    const result = await apiClient(
        "/api/admin/users/approved-review"
    );
    return result.data;
};

// 🚫 Toggle Suspend User
export const toggleSuspendUser = (id) => {
    return apiClient(`/api/admin/users/${id}/suspend`, {
        method: "PATCH",
    });
};

// 🗑 Delete User
export const deleteUser = (id) => {
    return apiClient(`/api/admin/users/${id}`, {
        method: "DELETE",
    });
};