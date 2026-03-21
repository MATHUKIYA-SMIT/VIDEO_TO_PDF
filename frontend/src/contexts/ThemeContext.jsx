import { createContext, useContext, useEffect, useState } from "react";
import { getThemeCookie, setThemeCookie } from "@/utils/themeCookie";
import { useAuth } from "@/features/auth/contexts/AuthContext";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const { isLoggedIn, user } = useAuth();
    const [theme, setTheme] = useState("light");

    // 🔥 Initial theme load
    useEffect(() => {
        const saved = getThemeCookie();
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        const initialTheme = saved || (systemDark ? "dark" : "light");

        setTheme(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
    }, []);

    // 🔥 Sync with database when user logs in
    useEffect(() => {
        if (isLoggedIn && user?.theme) {
            setTheme(user.theme);
            document.documentElement.setAttribute("data-theme", user.theme);
            setThemeCookie(user.theme);
        }
    }, [isLoggedIn, user]);

    const toggleTheme = async () => {
        const newTheme = theme === "dark" ? "light" : "dark";

        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        setThemeCookie(newTheme);

        if (isLoggedIn) {
        await fetch("http://localhost:5000/api/user/theme", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ theme: newTheme }),
        });
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
