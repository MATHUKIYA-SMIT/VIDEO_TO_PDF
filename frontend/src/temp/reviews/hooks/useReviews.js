import { useEffect, useState } from "react";
import { fetchReviews } from "../services/reviewService";

export const useReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadReviews = async () => {
        setLoading(true);
        try {
            const data = await fetchReviews();
            setReviews(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    return { reviews, loading, reload: loadReviews };
};
