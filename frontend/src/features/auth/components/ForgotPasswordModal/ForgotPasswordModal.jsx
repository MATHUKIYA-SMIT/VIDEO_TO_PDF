import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import OTPModal from "@/features/auth/components/OTPModal/OTPModal";
import { OTP_TYPES } from "@/constants/otp.constant";
import * as forgotHandler from "@/features/auth/handlers/forgotPasswordModal.handler";
import PasswordRules from "@/features/auth/components/PasswordRules/PasswordRules";
import "./ForgotPasswordModal.css";

function ForgotPasswordModal({ onClose, from }) {

    const navigate = useNavigate();
    const [showOTP, setShowOTP] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        if (loading) return;
        setLoading(true);
        try {
            await forgotHandler.forgotPassword(
                e,
                setEmail,
                setPassword,
                setShowOTP
            );
        }finally{
            setLoading(false);
        }
    };

    return (
        <>
            <div className="forgot-overlay" onClick={onClose}></div>

            <div className="forgot-modal">
                <button
                    className="forgot-close-btn"
                    onClick={onClose}
                    type="button"
                >
                    ×
                </button>

                <h3 className="forgot-title">Reset Password</h3>

                <form
                    onSubmit={handleSubmit}
                    className="forgot-form"
                >
                    <input
                        type="email"
                        name="email"
                        placeholder="Registered Email"
                        className="forgot-input"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        className="forgot-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    { password && <PasswordRules password={password} />}

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="forgot-input"
                        required
                    />

                    <button
                        type="submit"
                        className="forgot-submit-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="forgot-spinner me-2" />
                                Sending OTP...
                            </>
                        ) : (
                            "Send OTP"
                        )}
                    </button>
                </form>
            </div>

            {showOTP && (
                <OTPModal
                    email={email}
                    type={OTP_TYPES.RESET}
                    extraData={{ password }}
                    onClose={() => setShowOTP(false)}
                    onSuccess={() => navigate(from)}
                />
            )}
        </>
    );
}

export default ForgotPasswordModal;
