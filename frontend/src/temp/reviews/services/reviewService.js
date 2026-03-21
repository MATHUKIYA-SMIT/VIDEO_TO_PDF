export const fetchReviews = async () => {
    const res = await fetch(`http://localhost:5000/api/reviews`, {
        credentials: "include" // 🔐 send cookies
    });

    if (!res.ok) {
        throw new Error("Failed to load reviews");
    }

    const json = await res.json();
    return json.data;
};

export const submitReview = async (payload) => {
    const res = await fetch(`http://localhost:5000/api/reviews`, {
        method: "POST",
        credentials: "include", // 🔐 IMPORTANT
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        throw new Error("Failed to submit review");
    }

    return res.json();
};