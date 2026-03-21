const fs = require("fs");

const safeDelete = (pathToDelete) => {
    try {
        if (fs.existsSync(pathToDelete)) {
            fs.rmSync(pathToDelete, { recursive: true, force: true });
        }
    } catch (err) {
        console.error("Delete failed:", pathToDelete, err);
    }
};

module.exports = { safeDelete };
