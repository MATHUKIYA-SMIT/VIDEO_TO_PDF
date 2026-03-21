import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import * as authHandler from "@/features/auth/handlers/authModal.handler";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ROLES } from "@/constants/role.constant.js";
import "./DesktopNavbar.css";

function DesktopNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn, logout, user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const logoutUser = async () => {
        const success = await authHandler.logout();
        if (success) {
            logout();
            navigate("/");
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-left" onClick={() => navigate("/")}>
                <img 
                    src={ theme === "dark" ? "/images/logo_landing_dark.png" : "/images/logo_landing_light.png" }
                    alt="Vid2Pdf Logo" 
                    className="navbar-logo" 
                />
            </div>

            <div className="navbar-center">
                <span className="nav-link" onClick={() => navigate("/pricing",{state: { background: location }})}>Pricing</span>
                <div className="dropdown">
                    <span className="nav-link">
                        Features 
                        <span className="arrow"><i className="bi bi-chevron-down ms-1"></i></span>
                    </span>
                    <div className="dropdown-menu">
                        <p><i className="bi bi-arrow-repeat me-2"></i>Video Converter</p>
                        <p><i className="bi bi-download me-2"></i>Video Downloader</p>
                        <p><i className="bi bi-camera-video me-2"></i>Screen Recorder</p>
                        <p><i className="bi bi-file-text me-2"></i>AI Summarizer</p>
                        <p><i className="bi bi-chat-square-text me-2"></i>AI Transcription</p>
                        <p><i className="bi bi-translate me-2"></i>AI Translator</p>
                        <p><i className="bi bi-mic me-2"></i>Voice Tester</p>
                    </div>
                </div>

                <div className="dropdown">
                    <span className="nav-link">
                        Download 
                        <span className="arrow"><i className="bi bi-chevron-down ms-1"></i></span>
                    </span>
                    <div className="dropdown-menu">
                        <p><i className="bi bi-puzzle me-2"></i>Chrome Extension</p>
                        <p><i className="bi bi-apple me-2"></i>Mac App</p>
                        <p><i className="bi bi-android2 me-2"></i>Android App</p>
                        <p><i className="bi bi-phone me-2"></i>iOS App</p>
                    </div>
                </div>

                <div className="dropdown">
                    <span className="nav-link">
                        Explore 
                        <span className="arrow">
                            <i className="bi bi-chevron-down ms-1"></i>
                        </span>
                    </span>
                    <div className="dropdown-menu">
                        <p><i className="bi bi-life-preserver me-2"></i>Help Center</p>
                        <p><i className="bi bi-info-circle me-2"></i>About</p>
                        <p><i className="bi bi-briefcase me-2"></i>Careers</p>
                        <p><i className="bi bi-newspaper me-2"></i>Blog</p>
                    </div>
                </div>
            </div>

            <div className="navbar-right">
                <button className="nav-btn btn theme-toggle" onClick={toggleTheme}>
                    {theme === "dark" ? (
                        <i className="bi bi-moon-fill"></i>
                    ) : (
                        <i className="bi bi-sun-fill"></i>
                    )}
                </button>
                {!isLoggedIn ? (
                    <>
                        <button
                            className="nav-btn btn btn-light"
                            onClick={() =>
                                navigate("/login", {
                                    state: { background: location },
                                })
                            }
                        >
                            Login
                        </button>

                        <button
                            className="nav-btn btn btn-danger"
                            onClick={() =>
                                navigate("/signup", {
                                    state: { background: location },
                                })
                            }
                        >
                            Signup
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="nav-btn btn btn-danger"
                            onClick={logoutUser}
                        >
                            Logout
                        </button>
                        {/* Role-based dashboard button */}
                        {user?.role === ROLES.USER && (
                            <>
                                <div className="profile-icon" onClick={() =>  navigate("/profile", { state: { background: location } })}>
                                    <i className="bi bi-person-circle"></i>
                                </div>
                                <button
                                    className="btn btn-outline-warning me-3 fw-semibold"
                                    onClick={() => navigate("/user/dashboard")}
                                >
                                    <i className="bi bi-speedometer2 me-1"></i>
                                    Dashboard
                                </button>
                            </>
                        )}

                        {user?.role === ROLES.ADMIN && (
                            <button
                                className="btn btn-outline-warning me-3 fw-semibold"
                                onClick={() => navigate("/admin/dashboard")}
                            >
                                <i className="bi bi-speedometer2 me-1"></i>
                                Admin Panel
                            </button>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
}
export default DesktopNavbar;