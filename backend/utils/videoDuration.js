const ytDlp = require("yt-dlp-exec");

exports.getVideoDuration = async (url) => {
    try {

        const duration = await ytDlp(url, {
            getDuration: true
        });

        const parts = duration.trim().split(":").map(Number);

        let minutes = 0;

        if (parts.length === 3) {
            minutes = parts[0] * 60 + parts[1];
        } else if (parts.length === 2) {
            minutes = parts[0];
        }

        return minutes;

    } catch (err) {
        throw err;
    }
};