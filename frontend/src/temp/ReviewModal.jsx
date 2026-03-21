import { useEffect, useState } from "react";
import * as reviewModalHandler from "@/features/admin/handlers/reviewModal.handler";
import Spinner from "@/components/Spinner/Spinner";
import "./ReviewModal.css";

const ReviewModal = ({ userId, onClose, onActionComplete }) => {
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(false);

    const reload = () => reviewModalHandler.fetchUserPendingReview(userId, setLoading, setReview);
    useEffect(() => {
        reload();
    }, [userId]);

    const handleApprove = async () => {
        await reviewModalHandler.approveReview(review.id);
        onActionComplete?.();
        onClose?.();
    };

    const handleReject = async () => {
        await reviewModalHandler.rejectReview(review.id);
        onActionComplete?.();
        onClose?.();
    };

    return (
        <>
            <div className="modal-overlay" onClick={onClose}></div>

            <div className="admin-review-modal">
                {loading && <Spinner />}
                <button className="close-btn" onClick={onClose}>
                    ✖
                </button>

                {!review ? (
                    <p>No pending review found.</p>
                ) : (
                    <>
                        <h5>Pending Review</h5>

                        <p><strong>Rating:</strong> {"★".repeat(review.rating)}</p>
                        <p><strong>Comment:</strong> {review.comment}</p>

                        <div className="modal-actions">
                            <button
                                className="approve-btn"
                                onClick={handleApprove}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Approve"}
                            </button>

                            <button
                                className="reject-btn"
                                onClick={handleReject}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Reject"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ReviewModal;
