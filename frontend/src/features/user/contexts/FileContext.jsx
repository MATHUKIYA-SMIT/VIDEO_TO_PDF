import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import * as fileTableHandler from "@/features/user/handlers/fileTable.handler";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
    const { isLoggedIn } = useAuth(); 
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadFiles = useCallback(async () => {
        if (!isLoggedIn) return;
        try {
            setLoading(true);
            setError(null);

            const data = await fileTableHandler.getUserVideos();
            setFiles(data);
        } catch (err) {
            console.error("Failed to load files:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            loadFiles();
        }
    }, [isLoggedIn, loadFiles]);

    return (
        <FileContext.Provider
            value={{
                files,
                loading,
                error,
                reloadFiles: loadFiles,
            }}
        >
            {children}
        </FileContext.Provider>
    );
};

export const useFiles = () => {
    const context = useContext(FileContext);

    if (!context) {
        throw new Error("useFiles must be used inside FileProvider");
    }

    return context;
};
