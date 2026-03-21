import toast from "react-hot-toast";
import * as reviewModalService from "@/features/admin/services/reviewModal.service";


export const fetchUserReview = async (userId, setLoading, setReview) => {
    try {
        setLoading(true);
        const data = await reviewModalService.fetchUserReview(userId);
        setReview(data);
    } catch (error) {
        toast.error(error.message || "Failed to fetch review...");
        setReview(null);
    } finally {
        setLoading(false);
    }
};

export const approveReview = async (reviewId) => {
    try{
        const result = await reviewModalService.approveReview(reviewId);
        toast.success(result.message || "Review approved...");
    }catch(error){
        toast.error(error.message || "Review is not approved...");
    }
};

export const rejectReview = async (reviewId) => {
    try{
        const result = await reviewModalService.rejectReview(reviewId);
        toast.success(result.message || "Review rejected...");
    }catch(error){
        toast.error(error.message || "Review is not rejected...");
    }
};
