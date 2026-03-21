import { apiClient } from "@/lib/apiClient";

// Get all approved reviews
export const fetchReviews = async() => {
    const res = await apiClient("/api/reviews");
    return res.data;
};

// Get logged-in user's review
export const fetchMyReview = async() => {
    const res = await apiClient("/api/reviews/me");
    return res.data;
};

// Create review
export const submitReview = (payload) => {
    return apiClient("/api/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
};

// Update review
export const updateReview = (reviewId, payload) => {
    return apiClient(`/api/reviews/${reviewId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
};