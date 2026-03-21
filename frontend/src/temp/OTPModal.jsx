import { useEffect, useRef, useState } from "react";
import * as otpHandler from "@/features/auth/handlers/otpModal.handler";
import { OTP_TYPES } from "@/constants/otp.constants";
import "./OTPModal.css";

function OTPModal({ email, onClose, onSuccess }) {

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(120);
    const [loading, setLoading] = useState(false);

    const inputsRef = useRef([]);

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    // Countdown timer
    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }

        if (value && index === 5) {
            const finalOtp = newOtp.join("");
            if (finalOtp.length === 6) {
                submitOTP(finalOtp);
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d{6}$/.test(pasteData)) return;

        const newOtp = pasteData.split("");
        setOtp(newOtp);
        submitOTP(pasteData);
    };

    const submitOTP = async (code) => {
        if (loading) return;
        setLoading(true);

        try {
            await otpHandler.verifyOTP(
                { email, otp: code },
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
            await otpHandler.resendOTP({
                email,
                type: OTP_TYPES.SIGNUP
            },
                () => setTimer(120)
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClose = async () => {
        if (loading) return;
        setLoading(true);

        try {
            await otpHandler.cancelSignup({ email }, onClose);
        } finally {
            setLoading(false);
        }
    };

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

                <h2 className="otp-title">Email Verification</h2>
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
                    {loading ? "Sending..." : "Resend OTP"}
                </button>
                )}
            </div>
        </>
    );
}

export default OTPModal;

