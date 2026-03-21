import { apiClient } from "@/lib/apiClient";


export const fetchUserReview = async (userId) => {
    const result = await apiClient(
        `/api/admin/reviews/user/${userId}`
    );
    return result.data;
};

// ✅ Approve Review
export const approveReview = (reviewId) => {
    return apiClient(
        `/api/admin/reviews/${reviewId}/approve`,
        {
            method: "PATCH",
        }
    );
};

// ❌ Reject Review
export const rejectReview = (reviewId) => {
    return apiClient(
        `/api/admin/reviews/${reviewId}/reject`,
        {
            method: "PATCH",
        }
    );
};