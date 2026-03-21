import { createContext, useContext, useEffect, useState } from "react";
import { checkAuth } from "@/features/auth/services/authModal.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const initAuth = async () => {
            try {
            const result = await checkAuth();

            if (result) {
                setIsLoggedIn(true);
                setUser(result.data);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
            } catch {
            setIsLoggedIn(false);
            setUser(null);
            } finally {
            setAuthLoading(false);
            }
        };
        initAuth();
    }, []);

    const login_signup = (userData) => {
        setIsLoggedIn(true);
        setUser(userData || null);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider
        value={{ isLoggedIn, user, authLoading ,login_signup, logout }}
        >
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);