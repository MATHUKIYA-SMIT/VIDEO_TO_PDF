const VIDEO_PROCESSOR_SERVICE_URL =
    process.env.NODE_ENV === "production"
        ? process.env.VIDEO_PROCESSOR_SERVICE_URL_PRODUCTION
        : process.env.VIDEO_PROCESSOR_SERVICE_URL_LOCAL;

exports.processVideo = async ({
    videoPath,
    framesDir,
    pdfPath,
    videoId,
    baseName
}) => {

    const response = await fetch(
        `${VIDEO_PROCESSOR_SERVICE_URL}/process-video`,
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