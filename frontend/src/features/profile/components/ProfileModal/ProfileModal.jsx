import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Spinner from "@/components/Spinner/Spinner";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import * as profileHandler from "@/features/profile/handlers/profileModal.handler";
import DeleteAccountModal from "@/features/profile/components/DeleteAccountModal/DeleteAccountModal";
import "./ProfileModal.css";

function ProfileModal() {
    const navigate = useNavigate();
    const { user, login_signup } = useAuth();

    const [preview, setPreview] = useState(user?.profile_image || null);
    const [isUploading, setIsUploading] = useState(false);
    const [showDanger, setShowDanger] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const closeModal = () => {
        if (!isUploading) {
            navigate(-1);
        }
    };

    const handleAvatarChange = async (e) => {
        setIsUploading(true);
        const newUrl = await profileHandler.updateAvatar(e, setPreview, preview);
        if (newUrl) {
            login_signup({
                ...user,
                profile_image: newUrl
            });
        }

        setIsUploading(false);
    };


    const handleUsernameChange = async (e) => {
        setIsUploading(true);
        const newUsername = await profileHandler.updateUsername(e);
        if (newUsername) {
            login_signup({
                ...user,
                username: newUsername
            });
        }
        setIsUploading(false);
    };

    return (
        <>
            <div className="profile-overlay" onClick={closeModal}></div>

            <div className="profile-modal">
                {isUploading && <Spinner />}

                <button className="profile-close" onClick={closeModal}>✕</button>
                <h2 className="profile-title">My Profile</h2>

                {/* Avatar */}
                <div className="avatar-wrapper">
                    <div className="avatar-container">
                        <img
                        src={ preview ||"/images/default-avatar.png"}
                        alt="avatar"
                        className="profile-avatar"
                        />
                        <label className="avatar-upload">
                            <i className="bi bi-camera"></i>
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleAvatarChange}
                                disabled={isUploading}
                            />
                        </label>
                    </div>
                </div>

                {/* Username */}
                <form onSubmit={handleUsernameChange} className="username-form">
                    <input
                        type="text"
                        name="username"
                        defaultValue={user?.username}
                        className="username-input"
                        required
                    />
                    <button type="submit" className="update-btn" disabled={isUploading}>
                        Update Username
                    </button>
                </form>
                <div className="section-divider"></div>
                {/* Danger Zone */}
                <div className="danger-zone">
                    <button
                        className="danger-toggle"
                        onClick={() => setShowDanger(prev => !prev)}
                    >
                        ⚠ Danger Zone
                    </button>

                    {showDanger && (
                        <button
                            className="delete-btn"
                            onClick={() => setShowDeleteModal(true)}
                        >
                            Delete Account
                        </button>
                    )}
                </div>
            </div>
            {showDeleteModal && (
                <DeleteAccountModal
                    onClose={() => setShowDeleteModal(false)}
                />
            )}
        </>
    );
}

export default ProfileModal;