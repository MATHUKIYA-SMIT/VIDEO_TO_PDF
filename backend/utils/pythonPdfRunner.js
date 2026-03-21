const { spawn } = require("child_process");
const path = require("path");
const { PDF_DIR } = require("../config/path.config");

const PYTHON_BIN = path.join(
    __dirname,
    "..",
    "..",
    "python-service",
    "env",
    "Scripts",
    "python.exe" // Windows
);

const runFramesToPdf = (framesDir, videoId, baseName) => {
    return new Promise((resolve, reject) => {
        const pdfPath = path.join(PDF_DIR, `${baseName}_${videoId}.pdf`);

        const pythonScript = path.join(
            __dirname,
            "..",
            "..",
            "python-service",
            "src",
            "frames_to_pdf.py"
        );

        const python = spawn(PYTHON_BIN, [
            pythonScript,
            framesDir,
            pdfPath
        ]);

        python.stdout.on("data", data =>
            console.log("PYTHON PDF:", data.toString())
        );

        python.stderr.on("data", data =>
            console.error("PYTHON PDF ERROR:", data.toString())
        );

        python.on("close", code => {
            code === 0
                ? resolve(pdfPath)
                : reject(new Error("PDF generation failed"));
        });
    });
};

module.exports = { runFramesToPdf };
