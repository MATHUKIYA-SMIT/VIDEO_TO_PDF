import toast from "react-hot-toast";
import * as reviewModalService from "@/features/reviews/services/reviewModal.service";
import { extractFormData } from "@/utils/formUtils";

export const submitReview = async ({
    event,
    setLoading,
    navigate,
    location,
    reviewId,
    isLoggedIn
}) => {
    event.preventDefault();

    // 🔥 AUTH CHECK INSIDE HANDLER
    if (!isLoggedIn) {
        navigate("/login", {
            state: {
                background: location.state?.background || location,
                from: location.pathname,
            },
        });
        return;
    }

    const rawData = extractFormData(event.target);

    const payload = {
        rating: Number(rawData.rating),
        comment: rawData.comment.trim()
    };

    if (!payload.comment || payload.comment.length < 5) {
        toast.error("Comment is too short");
        return;
    }

    try {
        setLoading(true);

        if (reviewId) {
            const result = await reviewModalService.updateReview(reviewId, payload); //UPDATE
            toast.success(result.message || "Review updated (Pending approval)");
        } else {
            const result =await reviewModalService.submitReview(payload); // CREATE
            toast.success(result.message || "Review submitted (Pending approval)");
        }

        // 🔥 SUCCESS NAVIGATION HERE
        navigate("/");
    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
};
