import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useUsage } from "@/features/user/contexts/UsageContext";
import Spinner from "@/components/Spinner/Spinner";

import * as authHandler from "@/features/auth/handlers/authModal.handler";

import "./Sidebar.css";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const { user, logout, authLoading } = useAuth();

    const [open, setOpen] = useState(false);
    const { usage, loading } = useUsage();

    const logoutUser = async () => {
        const success = await authHandler.logout();
        if (success) {
            logout();
            navigate("/", { replace: true, state: { fromLogout: true } });
        }
    };

    // Default fallback
    const dailyUsed = usage?.daily_count || 0;
    const monthlyUsed = usage?.monthly_minutes || 0;

    const DAILY_LIMIT = 3;
    const MONTHLY_LIMIT = 120;

    const dailyPercent = (dailyUsed / DAILY_LIMIT) * 100;
    const monthlyPercent = (monthlyUsed / MONTHLY_LIMIT) * 100;

    return (
        <div className="sidebar">

            {/* Logo */}
            <div className="sidebar-logo-wrapper">
                <img 
                    src={ theme === "dark" ? "/images/logo_landing_dark.png" : "/images/logo_dash_light.png" }
                    alt="Vid2Pdf Logo" 
                    className="sidebar-logo" 
                />
            </div>

            {/* Current Plan Card */}
            <div className="plan-card">

                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="plan-header">
                            <span>CURRENT PLAN</span>
                            <span className="plan-badge">FREE</span>
                        </div>

                        {/* Daily Usage */}
                        <div className="usage-item">
                            <div className="usage-row">
                                <span>Daily</span>
                                <span>{dailyUsed}/3</span>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${dailyPercent}%` }}
                                />
                            </div>
                        </div>

                        {/* Monthly Usage */}
                        <div className="usage-item">
                            <div className="usage-row">
                                <span>Minutes</span>
                                <span>{monthlyUsed}/120 min</span>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${monthlyPercent}%` }}
                                />
                            </div>
                        </div>

                        <button
                            className="upgrade-button"
                            onClick={() =>
                                navigate("/pricing", {
                                    state: { background: location }
                                })
                            }
                        >
                            Upgrade Plan
                        </button>
                    </>
                )}
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                <NavLink to="/user/dashboard" end>
                    Home
                </NavLink>
                <NavLink to="/user/dashboard/files">
                    Files
                </NavLink>
            </nav>

            {/* Bottom User Section */}
            <div className="sidebar-user">
                <div
                    className={`user-card ${open ? "open" : ""}`}
                    onClick={() => setOpen(!open)}
                >   
                    {authLoading && <Spinner/>}
                    <img
                        src={user?.profile_image || "/images/default-avatar.png"}
                        alt="User Avatar"
                        className="avatar rounded-circle me-2"
                    />
                    <div className="user-info">
                        <span className="user-name">
                            {user?.username || "Guest"}
                        </span>

                        <span className="user-email">
                            {user?.email || "guest@example.com"}
                        </span>
                    </div>
                    <i className="bi bi-chevron-down sb-user-chevron" />
                </div>

                {open && (
                    <div className="user-dropdown">

                        <button className="dropdown-item-btn" onClick={() => navigate("/profile", { state: { background: location } })}>
                            <i className="bi bi-person me-2"></i>
                            Profile
                        </button>

                        <div className="sb-theme-wrapper">

                            <div className="sb-theme-left">
                                <i className="bi bi-palette-fill sb-theme-main-icon"></i>
                                <span className="sb-theme-label">Theme</span>
                            </div>

                            <div className="sb-theme-icons">

                                <div
                                    className={`sb-theme-icon-box ${theme === "light" ? "sb-theme-active-box" : ""}`}
                                    onClick={() => {
                                        if (theme === "dark") toggleTheme();
                                    }}
                                >
                                    <i className="bi bi-sun-fill"></i>
                                </div>

                                <div
                                    className={`sb-theme-icon-box ${theme === "dark" ? "sb-theme-active-box" : ""}`}
                                    onClick={() => {
                                        if (theme === "light") toggleTheme();
                                    }}
                                >
                                    <i className="bi bi-moon-fill"></i>
                                </div>
                            </div>
                        </div>

                        <hr className="dropdown-divider" />

                        <button
                            type="button"
                            className="btn btn-outline-danger w-100 logout-btn"
                            onClick={logoutUser}
                        >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Sign Out
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
