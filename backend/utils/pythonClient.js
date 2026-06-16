exports.processVideo = async ({
    videoPath,
    framesDir,
    pdfPath,
    videoId,
    baseName
}) => {

    const response = await fetch(
        `${process.env.VIDEO_PROCESSING_SERVICE_URL}/process-video`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                video_path: videoPath,
                frames_dir: framesDir,
                pdf_path: pdfPath,
                video_id: videoId,
                base_name: baseName
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail ||
            "Failed to process video"
        );
    }

    return data;
};

exports.predictReviewSentiment = async ({
    review
}) => {

    const response = await fetch(
        `${process.env.VIDEO_PROCESSING_SERVICE_URL}/predict-review-sentiment`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                review
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail ||
            "Failed to predict review sentiment"
        );
    }

    return data;
};