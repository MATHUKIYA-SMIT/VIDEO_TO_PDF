import { useState } from "react";
import "./StarRating.css";

const StarRating = ({ value = 5, onChange }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
            <i
                key={star}
                className={`bi bi-star-fill star-icon ${
                    star <= (hover || value) ? "active" : ""
                }`}
                onClick={() => onChange(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
            ></i>
        ))}
        </div>
    );
};

export default StarRating;
