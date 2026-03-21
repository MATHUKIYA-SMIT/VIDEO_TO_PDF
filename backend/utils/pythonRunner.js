const { spawn } = require("child_process");
const path = require("path");
const { FRAME_DIR } = require("../config/path.config");

const PYTHON_BIN = path.join(
    __dirname,
    "..",
    "..",
    "python-service",
    "env",
    "Scripts",
    "python.exe"
);

const runPythonFrameExtractor = (videoPath, videoId, baseName) => {
    return new Promise((resolve, reject) => {

        const framesDir = path.join(FRAME_DIR, `${baseName}_${videoId}`);

        const pythonScript = path.join(
            __dirname,
            "..",
            "..",
            "python-service",
            "src",
            "video_to_frames.py"
        );

        console.log("Using Python:", PYTHON_BIN);

        const python = spawn(PYTHON_BIN, [
            pythonScript,
            videoPath,
            framesDir
        ]);

        python.stdout.on("data", (data) => {
            console.log("PYTHON STDOUT:", data.toString());
        });

        python.stderr.on("data", (data) => {
            console.error("PYTHON STDERR:", data.toString());
        });

        python.on("close", (code) => {
            console.log("PYTHON EXIT CODE:", code);

            code === 0
                ? resolve(framesDir)
                : reject(new Error("Python frame extraction failed"));
        });
    });
};

module.exports = { runPythonFrameExtractor };
