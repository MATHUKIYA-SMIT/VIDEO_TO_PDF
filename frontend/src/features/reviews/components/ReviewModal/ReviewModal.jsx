import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import Spinner from "@/components/Spinner/Spinner";
import StarRating from "@/components/StarRating/StarRating";
import * as reviewModalHandler from "@/features/reviews/handlers/reviewModal.handler";
import "./ReviewModal.css";

const ReviewModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn } = useAuth();
    const background = location.state?.background;
    const existingReview = location.state?.myReview;

    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (existingReview) {
            setRating(existingReview.rating);
            setComment(existingReview.comment);
        }
    }, [existingReview]);

    const closeModal = () => {
        if (background && location.pathname != background.pathname) {
            navigate(background.pathname, { replace: true });
        } else {
            navigate("/", { replace: true });
        }
    };

    const openAddReview = async (event) => {
        await reviewModalHandler.submitReview({
            event,
            setLoading,
            navigate,
            location,
            reviewId: existingReview?.id,
            isLoggedIn
        });
    };

    return (
        <>
            <div className="review-overlay" onClick={closeModal}></div>

            <div className="review-modal">
                {loading && <Spinner />}
                <form className="review-form" onSubmit={openAddReview}>
                    <h3 className="review-title">
                        {existingReview ? "Update Review" : "Add Review"}
                    </h3>

                    <div className="review-field">
                        <label>Rating</label>
                        <StarRating value={rating} onChange={setRating} />
                        <input type="hidden" name="rating" value={rating} />
                    </div>

                    <div className="review-field">
                        <label>Comment</label>
                        <textarea
                            name="comment"
                            rows="4"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </div>

                    <div className="review-actions">
                        <button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </button>

                        <button type="button" className="cancel-btn" onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ReviewModal;
