import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import * as usageHandler from "@/features/user/handlers/sidebar.handler";

const UsageContext = createContext();

export const UsageProvider = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const [usage, setUsage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadUsage = useCallback(async () => {
        if (!isLoggedIn) return;
        try {
            setLoading(true);
            setError(null);

            const data = await usageHandler.getUsage();
            setUsage(data);
        } catch (err) {
            console.error("Failed to load usage:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [isLoggedIn]);

    // Load usage on first mount
    useEffect(() => {
        if (isLoggedIn) {
            loadUsage();
        }
    }, [isLoggedIn, loadUsage]);

    return (
        <UsageContext.Provider
            value={{
                usage,
                loading,
                error,
                reloadUsage: loadUsage,
            }}
        >
            {children}
        </UsageContext.Provider>
    );
};

export const useUsage = () => {
    const context = useContext(UsageContext);

    if (!context) {
        throw new Error("useUsage must be used inside UsageProvider");
    }

    return context;
};
