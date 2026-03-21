import { useRef } from "react";
import ReviewCard from "../ReviewCard/ReviewCard";

const ReviewHorizontalList = ({ reviews }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (!scrollRef.current) return;

        const containerWidth = scrollRef.current.clientWidth;

        scrollRef.current.scrollBy({
        left: direction === "left" ? -containerWidth : containerWidth,
        behavior: "smooth",
        });
    };

    return (
        <div className="container position-relative my-5">
            <button
                className="btn btn-light rounded-circle position-absolute top-50 start-0 translate-middle-y shadow-sm"
                onClick={() => scroll("left")}
                style={{ zIndex: 10 }}
            >
                <i className="bi bi-chevron-left"></i>
            </button>

            <div ref={scrollRef} className="d-flex overflow-hidden">
                {reviews.map((r) => (
                <div key={r.id} className="col-12 col-md-6 col-lg-4 flex-shrink-0 px-3 my-3">
                    <ReviewCard review={r} />
                </div>
                ))}
            </div>

            <button
                className="btn btn-light rounded-circle position-absolute top-50 end-0 translate-middle-y shadow-sm"
                onClick={() => scroll("right")}
                style={{ zIndex: 10 }}
            >
                <i className="bi bi-chevron-right"></i>
            </button>
        </div>
    );
};

export default ReviewHorizontalList;
