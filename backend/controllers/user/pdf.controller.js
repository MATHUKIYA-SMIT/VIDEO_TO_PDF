const pdfService = require("../../services/user/pdf.service");

exports.download = async (req, res, next) => {
    try {
        const pdfId = req.params.id;
        const userId = req.user.id; // from auth middleware

        const file = await pdfService.download(
            pdfId,
            userId
        );

        // ⬇️ DOWNLOAD (browser saves to Downloads)
        res.download(file.path, file.name, (err) => {
            if (err) {
                console.error("Download error:", err);
                return;
            }

            // 🧹 DELETE PDF AFTER SUCCESSFUL DOWNLOAD
            pdfService.removeFile(file.path);
        });

    } catch (err) {
        next(err);
    }
};
