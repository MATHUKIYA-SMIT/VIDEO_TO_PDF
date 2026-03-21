import { useState } from "react";
import StarRating from "../../../../components/StarRating/StarRating";
import { useNavigate, useLocation } from "react-router-dom";
import { handleReviewSubmit } from "../../handlers/reviewHandlers";
import "./ReviewModal.css";

const ReviewModal = () => {
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(5);

    const navigate = useNavigate();
    const location = useLocation();
    const background = location.state?.background;

      // 🔥 Close modal → go back to where it opened from
    const closeModal = () => {
        if (background) {
        navigate(background.pathname);
        } else {
        navigate(-1); // fallback
        }
    };

    const openAddReview = async (event) => {
        await handleReviewSubmit({
        event,
        setLoading,
        navigate,
        });
    };

    return (
        <>
        {/* Blur background */}
        <div className="review-overlay" onClick={closeModal}></div>

        {/* Centered modal */}
        <div className="review-modal">
            <form className="review-form" onSubmit={openAddReview}>
                <h3 className="review-title">Add Review</h3>

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
                    placeholder="Write your review"
                    required
                    />
                </div>

                <div className="review-actions">
                    <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
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
