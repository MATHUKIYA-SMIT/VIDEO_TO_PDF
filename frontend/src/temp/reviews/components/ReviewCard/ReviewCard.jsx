import "./ReviewCard.css";

const ReviewCard = ({ review }) => {
    return (
        <div className="card h-100 review-card border-0">
            <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                    <img
                        src={`http://localhost:5000${review.profile_image}`}
                        alt={review.username}
                        className="rounded-circle me-3 review-avatar"
                    />
                    <div>
                        <h6 className="mb-0 fw-semibold">{review.username}</h6>
                        <div className="text-warning small">
                        {"★".repeat(review.rating)}
                        </div>
                    </div>
                </div>

                <p className="review-text small flex-grow-1">
                {review.comment}
                </p>

                <small className="review-date">
                {new Date(review.created_at).toLocaleDateString()}
                </small>
            </div>
        </div>
    );
};

export default ReviewCard;
