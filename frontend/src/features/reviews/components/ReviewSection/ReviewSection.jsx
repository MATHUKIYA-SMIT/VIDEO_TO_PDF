import { useNavigate, useLocation } from "react-router-dom";
import { useReviews } from "@/features/reviews/hooks/useReviews";
import { useAuth } from "@/features/auth/contexts/AuthContext"; 
import ReviewHorizontalList from "../ReviewHorizontalList/ReviewHorizontalList";
import Spinner from "@/components/Spinner/Spinner";
import "./ReviewSection.css"

const ReviewSection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn, user } = useAuth();
    const { reviews, myReview, loading } = useReviews(isLoggedIn, user);

    return (
        <section className="reviews-section ">
            <h2 className="text-center mb-4">User Reviews</h2>

            {loading ? (
                <Spinner />
            ) : (
                <ReviewHorizontalList reviews={reviews} />
            )}

            <div className="container d-flex justify-content-end">
                <div className="col-12 col-md-6 col-lg-4 flex-shrink-0 px-3 my-3 d-flex justify-content-end">
                    <button
                        className="add-review-btn"
                        onClick={() =>
                            navigate("/add-review", {
                                state: {
                                    background: location,
                                    myReview// 🔥 pass review to modal
                                }
                            })
                        }
                    >
                        {myReview ? "✏️ Update Review" : "+ Add Review"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;
