import { useState } from "react";
import { useFiles } from "@/features/user/contexts/FileContext";
import Spinner from "@/components/Spinner/Spinner";
import "./FileTable.css";

const FileTable = () => {
    const { files, loading } = useFiles();
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = async (id, url) => {
        try {
            await navigator.clipboard.writeText(url);
            setCopiedId(id);
            setTimeout(() => {
                setCopiedId(null);
            }, 2000);
        } catch (err) {
            console.error("Copy failed");
        }
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    return (
        <div className="files-container">
            <h2 className="files-header">All Files</h2>

            <div className="table-wrapper">
                {loading && <Spinner />}
                <table className="files-table">
                    <thead>
                        <tr>
                            <th>URL</th>
                            <th>Duration</th>
                            <th>Uploaded</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map(({ id, url, duration_seconds, uploaded_at }) => (
                            <tr key={id}>
                                <td className="url-cell">
                                    <span className="url-text" title={url}>
                                        {url?.length > 40 ? url.slice(0, 40) + "..." : url}
                                    </span>

                                    <button
                                        className="copy-btn"
                                        onClick={() => handleCopy(id, url)}
                                    >
                                        {copiedId === id ? (
                                            <>
                                                <i className="bi bi-check-lg"></i>
                                                <span className="tooltip-text">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-clipboard"></i>
                                                <span className="tooltip-text">
                                                    Copy to clipboard
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </td>
                                <td>{formatDuration(duration_seconds)}</td>
                                <td>{formatDate(uploaded_at)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FileTable;
