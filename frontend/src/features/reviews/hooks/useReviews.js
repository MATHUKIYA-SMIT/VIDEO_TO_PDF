import { useEffect, useState } from "react";
import * as reviewModalService from "@/features/reviews/services/reviewModal.service";
import socket from "@/utils/socket";

export const useReviews = (isLoggedIn, user) => {
    const [reviews, setReviews] = useState([]);
    const [myReview, setMyReview] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadReviews = async () => {
        setLoading(true);

        try {
            const publicReviews = await reviewModalService.fetchReviews();
            setReviews(publicReviews);

            if (isLoggedIn) {
                try {
                    const userReview = await reviewModalService.fetchMyReview();
                    setMyReview(userReview);
                } catch {
                    setMyReview(null);
                }
            } else {
                setMyReview(null);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReviews();
    }, [isLoggedIn]);

    useEffect(() => {
        if (!isLoggedIn || !user?.id) return;

        socket.emit("join-user-room", user.id);

        const handleApproved = () => {
            loadReviews();
        };

        const handleRejected = () => {
            loadReviews();
        };

        socket.on("review:approved", handleApproved);
        socket.on("review:rejected", handleRejected);

        return () => {
            socket.off("review:approved", handleApproved);
            socket.off("review:rejected", handleRejected);
        };
    }, [isLoggedIn, user?.id]);

    return { reviews, myReview, loading, reload: loadReviews };
};
