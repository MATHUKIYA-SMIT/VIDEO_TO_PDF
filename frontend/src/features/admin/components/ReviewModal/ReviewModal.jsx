import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as reviewModalHandler from "@/features/admin/handlers/reviewModal.handler";
import Spinner from "@/components/Spinner/Spinner";
import "./ReviewModal.css";


const ReviewModal = ({ userId, onClose, onActionComplete }) => {
    const location = useLocation();
    const isPending = location.pathname.includes("pending-review");

    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(false);

    const reload = () => reviewModalHandler.fetchUserReview(userId, setLoading, setReview);

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
            <div className="arm-overlay" onClick={onClose}></div>

            <div className="arm-modal">
                {loading && <Spinner />}

                <button className="arm-close" onClick={onClose}>✖</button>

                {!review ? (
                    <p className="arm-empty">No review found.</p>
                ) : (
                    <>
                        <h4 className="arm-title">Review Details</h4>

                        <div className="arm-content">
                            <p>
                                <strong>Status:</strong>{" "}
                                <span className={`arm-status arm-${review.status}`}>
                                    {review.status}
                                </span>
                            </p>

                            <div className="arm-rating">
                                <strong>Rating:</strong>
                                <div className="arm-stars">
                                    {[1,2,3,4,5].map(star => (
                                        <i
                                            key={star}
                                            className={`bi ${
                                                star <= review.rating
                                                    ? "bi-star-fill"
                                                    : "bi-star"
                                            }`}
                                        ></i>
                                    ))}
                                </div>
                            </div>

                            <div className="arm-comment">
                                <strong>Comment:</strong>
                                <textarea
                                    className="arm-textarea"
                                    value={review.comment}
                                    disabled
                                    rows={4}
                                />
                            </div>
                        </div>

                        <div className="arm-actions">
                            {!isPending ? (
                                <>
                                    <button className="arm-btn arm-secondary" onClick={onClose}>
                                        Cancel
                                    </button>
                                    <button className="arm-btn arm-danger" onClick={handleReject}>
                                        Reject
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="arm-btn arm-success" onClick={handleApprove}>
                                        Approve
                                    </button>
                                    <button className="arm-btn arm-danger" onClick={handleReject}>
                                        Reject
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ReviewModal;