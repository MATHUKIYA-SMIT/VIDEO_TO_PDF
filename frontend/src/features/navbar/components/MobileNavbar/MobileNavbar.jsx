import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import * as authHandler from "@/features/auth/handlers/authModal.handler";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import "./MobileNavbar.css";

function MobileNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn, logout } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);
    const [openSection, setOpenSection] = useState(null);

    const logoutUser = async () => {
        const success = await authHandler.logout();
        if (success) {
            logout();
            navigate("/");
        }
        setMenuOpen(false);
    };

    const goTo = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const menuData = [
        {
        title: "Features",
        items: [
            { icon: "bi-arrow-repeat", label: "Video Converter" },
            { icon: "bi-download", label: "Video Downloader" },
            { icon: "bi-camera-video", label: "Screen Recorder" },
            { icon: "bi-file-text", label: "AI Summarizer" },
            { icon: "bi-chat-square-text", label: "AI Transcription" },
            { icon: "bi-translate", label: "AI Translator" },
            { icon: "bi-mic", label: "Voice Tester" },
        ],
        },
        {
        title: "Download",
        items: [
            { icon: "bi-puzzle", label: "Chrome Extension" },
            { icon: "bi-apple", label: "Mac App" },
            { icon: "bi-android2", label: "Android App" },
            { icon: "bi-phone", label: "iOS App" },
        ],
        },
        {
        title: "Explore",
        items: [
            { icon: "bi-life-preserver", label: "Help Center" },
            { icon: "bi-info-circle", label: "About" },
            { icon: "bi-briefcase", label: "Careers" },
            { icon: "bi-newspaper", label: "Blog" },
        ],
        },
    ];

    return (
        <>
            <nav className="navbar mobile">
                <div className="navbar-left">
                    <img src="/image.png" className="navbar-logo" />
                </div>

                <div className="navbar-right">
                    {!isLoggedIn ? (
                        <button className="nav-btn btn btn-danger" onClick={() =>  navigate("/login", {state: { background: location }})}>Login</button>
                    ) : (
                        <>
                            <div className="profile-icon" onClick={() =>  navigate("/profile", { state: { background: location } })}>
                                <i className="bi bi-person-circle"></i>
                            </div>
                            <button className="nav-btn btn btn-danger" onClick={logoutUser}>Logout</button>
                            <button className="btn btn btn-outline-warning me-3 fw-semibold" onClick={() => navigate("/user/dashboard")}>
                                <i className="bi bi-speedometer2 me-1"></i>
                                Dashboard
                            </button>
                        </>
                    )}

                    <button
                        className="menu-toggle"
                        onClick={() => {
                        setMenuOpen(!menuOpen);
                        setOpenSection(null);
                        }}
                    >
                        <i className={`bi ${menuOpen ? "bi-x" : "bi-list"}`} />
                    </button>
                </div>
            </nav>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="mobile-menu-overlay">
                    <div className="mobile-menu-content">

                        <div className="mobile-link" onClick={() => goTo("/pricing")}>Pricing</div>

                        {menuData.map(({ title, items }) => (
                        <div key={title}>
                            <div className="mobile-link" onClick={() => toggleSection(title)}>
                                <span>{title}</span>
                                <i className={`bi bi-chevron-${openSection === title ? "up" : "down"}`}/>
                            </div>

                            {openSection === title && (
                            <div className="submenu">
                                {items.map(({ icon, label }) => (
                                <p key={label}>
                                    <i className={`bi ${icon}`}></i> {label}
                                </p>
                                ))}
                            </div>
                            )}
                        </div>
                        ))}

                    </div>
                </div>
            )}
        </>
    );
}

export default MobileNavbar;
