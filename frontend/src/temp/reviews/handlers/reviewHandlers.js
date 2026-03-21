import toast from "react-hot-toast";
import { submitReview } from "../services/reviewService";
import { extractFormData } from "../../../utils/formUtils";

export const handleReviewSubmit = async ({event, setLoading, navigate}) => {
    event.preventDefault();

    const rawData = extractFormData(event.target);

    const payload = {
        rating: Number(rawData.rating),
        comment: rawData.comment?.trim()
    };

    if (!payload.comment || payload.comment.length < 5) {
        toast.error("Enter Comment Having Sufficient Length !!");
        navigate("/add-review");
        return;
    }

    try {
        setLoading(true);
        await submitReview(payload);
        navigate("/");
    } catch (error) {
            toast.error(`${error.message}`);
            navigate("/add-review");
    } finally {
        setLoading(false);
    }
};
