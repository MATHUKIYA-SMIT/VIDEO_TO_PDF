import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import Spinner from "@/components/Spinner/Spinner";
import * as authHandler from "@/features/auth/handlers/authModal.handler";

import "./AdminSidebar.css";

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const { user, logout, authLoading } = useAuth();

    const [open, setOpen] = useState(false);

    const logoutUser = async () => {
        const success = await authHandler.logout();
        if (success) {
            logout();
            navigate("/", { replace: true, state: { fromLogout: true } });
        }
    };

    return (
        <div className="admin-sidebar">

            {/* Logo */}
            <div className="admin-sidebar-logo-wrapper">
                <img 
                    src={ theme === "dark" ? "/images/logo_landing_dark.png" : "/images/logo_dash_light.png" }
                    alt="Vid2Pdf Logo"
                    className="admin-sidebar-logo"
                />
            </div>

            {/* Navigation */}
            <nav className="admin-sidebar-nav">
                <NavLink to="/admin/dashboard" end>
                    Dashboard
                </NavLink>

                <NavLink to="/admin/dashboard/pending-reviews">
                    User Management
                </NavLink>
            </nav>

            {/* Bottom Admin Section */}
            <div className="admin-sidebar-user">
                <div
                    className={`admin-user-card ${open ? "open" : ""}`}
                    onClick={() => setOpen(!open)}
                >
                    {authLoading && <Spinner />}

                    <img
                        src={user?.profile_image || "/images/default-avatar.png"}
                        alt="Admin Avatar"
                        className="rounded-circle me-2 admin-avatar"
                    />

                    <div className="admin-user-info">
                        <span className="admin-user-name">
                            {user?.username || "Admin"}
                        </span>

                        <span className="admin-user-email">
                            {user?.email}
                        </span>
                    </div>

                    <i className="bi bi-chevron-down admin-user-chevron" />
                </div>

                {open && (
                    <div className="admin-user-dropdown">

                        <button
                            className="admin-dropdown-btn"
                            onClick={() =>
                                navigate("/profile", {
                                    state: { background: location }
                                })
                            }
                        >
                            <i className="bi bi-person me-2"></i>
                            Profile
                        </button>

                        <div className="admin-theme-wrapper">

                            <div className="admin-theme-left">
                                <i className="bi bi-palette-fill admin-theme-main-icon"></i>
                                <span className="admin-theme-label">Theme</span>
                            </div>

                            <div className="admin-theme-icons">

                                <div
                                    className={`admin-theme-box ${theme === "light" ? "admin-theme-active" : ""}`}
                                    onClick={() => {
                                        if (theme === "dark") toggleTheme();
                                    }}
                                >
                                    <i className="bi bi-sun-fill"></i>
                                </div>

                                <div
                                    className={`admin-theme-box ${theme === "dark" ? "admin-theme-active" : ""}`}
                                    onClick={() => {
                                        if (theme === "light") toggleTheme();
                                    }}
                                >
                                    <i className="bi bi-moon-fill"></i>
                                </div>

                            </div>
                        </div>

                        <hr className="admin-divider" />

                        <button
                            type="button"
                            className="btn btn-outline-danger w-100 admin-logout-btn"
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

export default AdminSidebar;