import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner/Spinner";
import * as deleteAccountHandler from "@/features/profile/handlers/deleteAccountModal.handler";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import "./DeleteAccountModal.css";

function DeleteAccountModal({ onClose }) {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [confirmText, setConfirmText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        const success = await deleteAccountHandler.deleteAccount();
        setIsDeleting(false);

        if (success) {
            navigate("/", { replace: true, state: { fromLogout: true } });
            logout();
        }
    };

    return (
        <>
            <div className="delete-overlay" onClick={onClose}></div>

            <div className="delete-modal">
                {isDeleting && <Spinner />}

                <h3>Delete Account Permanently?</h3>

                <p className="delete-warning">
                    This action cannot be undone.
                    <br />
                    Type <strong>delete account</strong> to confirm.
                </p>

                <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="Type delete account"
                    disabled={isDeleting}
                />

                <div className="delete-actions">
                    <button
                        className="cancel-btn"
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>

                    <button
                        className="confirm-delete-btn"
                        disabled={
                            confirmText !== "delete account" || isDeleting
                        }
                        onClick={handleDelete}
                    >
                        Permanently Delete
                    </button>
                </div>
            </div>
        </>
    );
}

export default DeleteAccountModal;