const ytDlp = require("yt-dlp-exec");

const downloadYoutubeVideo = async (url, outputPath) => {
    try {
        await ytDlp(url, {
            format: "bestvideo[height<=720]/bestvideo", // video only
            output: outputPath, // .mp4 or .webm
            jsRuntimes: "node"
        });
    } catch (err) {
        console.error("yt-dlp error:", err.message);
        throw new Error("YT_DLP_FAILED");
    }
};

module.exports = { downloadYoutubeVideo };
