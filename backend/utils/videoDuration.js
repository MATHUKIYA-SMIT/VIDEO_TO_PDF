const { exec } = require("child_process");

exports.getVideoDuration = (url) => {
    return new Promise((resolve, reject) => {

        exec(`yt-dlp --get-duration ${url}`, (err, stdout) => {
            if (err) return reject(err);

            const duration = stdout.trim(); // format 00:12:35

            const parts = duration.split(":").map(Number);

            let minutes = 0;

            if (parts.length === 3) {
                minutes = parts[0] * 60 + parts[1];
            } else if (parts.length === 2) {
                minutes = parts[0];
            }

            resolve(minutes);
        });

    });
};
