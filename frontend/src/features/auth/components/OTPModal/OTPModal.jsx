import { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import * as otpHandler from "@/features/auth/handlers/otpModal.handler";
import { OTP_TYPES } from "@/constants/otp.constant";
import "./OTPModal.css";

function OTPModal({ email, type, extraData = {}, onClose, onSuccess }) {

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(120);
    const [loading, setLoading] = useState(false);

    const inputsRef = useRef([]);

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const submitOTP = async (code) => {
        if (loading) return;
        setLoading(true);

        try {
            await otpHandler.verifyOTP(
                {
                    email,
                    otp: code,
                    type,
                    ...extraData
                },
                onSuccess
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (loading) return;
        setLoading(true);

        try {
            await otpHandler.resendOTP(
                { email, type },
                () => setTimer(120)
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClose = async () => {
        if (loading) return;

        // Only cancel signup flow
        if (type === OTP_TYPES.SIGNUP) {
            await otpHandler.cancelSignup({ email });
        }

        onClose();
    };

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }

        if (value && index === 5) {
            const finalOtp = newOtp.join("");
            if (finalOtp.length === 6) {
                submitOTP(finalOtp);
            }
        }
    };

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d{6}$/.test(pasteData)) return;

        setOtp(pasteData.split(""));
        submitOTP(pasteData);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const title =
        type === OTP_TYPES.SIGNUP
            ? "Email Verification"
            : "Password Reset Verification";

    return (
        <>
            <div className="otp-overlay" onClick={handleClose}></div>

            <div
                className="otp-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="otp-close"
                    onClick={handleClose}
                    disabled={loading}
                >
                    ×
                </button>

                <h2 className="otp-title">{title}</h2>
                <p className="otp-subtitle">
                    Enter 6-digit OTP sent to <b>{email}</b>
                </p>

                <div className="otp-box-container" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            className="otp-box"
                            value={digit}
                            ref={(el) => (inputsRef.current[index] = el)}
                            onChange={(e) =>
                                handleChange(e.target.value, index)
                            }
                            onKeyDown={(e) =>
                                handleKeyDown(e, index)
                            }
                            disabled={loading}
                        />
                    ))}
                </div>

                {timer > 0 ? (
                    <p className="otp-timer">
                        Resend in {timer}s
                    </p>
                ) : (
                    <button
                        type="button"
                        className="otp-resend"
                        onClick={handleResend}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="otp-spinner me-2" />
                                Sending OTP...
                            </>
                            ) : ("Resend OTP")}
                    </button>
                )}
            </div>
        </>
    );
}

export default OTPModal;
