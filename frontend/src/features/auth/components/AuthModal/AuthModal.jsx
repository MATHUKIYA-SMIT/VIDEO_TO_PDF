import { useState } from "react";
import { useNavigate,  useLocation } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import * as authHandler from "@/features/auth/handlers/authModal.handler.js";
import { OTP_TYPES } from "@/constants/otp.constant";
import ForgotPasswordModal from "@/features/auth/components/ForgotPasswordModal/ForgotPasswordModal";
import OTPModal from "@/features/auth/components/OTPModal/OTPModal";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import PasswordRules from "@/features/auth/components/PasswordRules/PasswordRules";
import "./AuthModal.css";

function AuthModal({ defaultTab }) {
    const auth = useAuth();
    const [tab, setTab] = useState(defaultTab);
    const [showOTP, setShowOTP] = useState(false);
    const [signupEmail, setSignupEmail] = useState("");
    const [showForgot, setShowForgot] = useState(false);
    const [password, setPassword] = useState("");
    const [isSigningUp, setIsSigningUp] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const background = location.state?.background;
    const from = location.state?.from || "/";

    const openLogin = () => {
        setTab("login");
        navigate("/login", {state: { background }});
    };
    const openSignup = () => {
        setTab("signup");
        navigate("/signup", {state: { background }});
    };

    const closeModal = () => {
        if (location.state?.background) {
            navigate(location.state.background.pathname, { replace: true });
        } else {
            navigate("/", { replace: true });
        }
    };
    const onLogin = async (e) => { await authHandler.login(e, auth, navigate, from, background);};
    const onSignup = async (e) => {
        if (isSigningUp) return;
        setIsSigningUp(true);
        try {
            await authHandler.signup(e, setSignupEmail, setShowOTP);
        }finally{
            setIsSigningUp(false);
        }
    };
    const handleGoogleLogin = async (credentialResponse) => {await authHandler.googleLogin(credentialResponse,auth,navigate);};

    return (
        <>
            <div className="auth-overlay" onClick={closeModal}></div>

            <div className="auth-modal">

                <div className="auth-tabs">
                <button
                    className={`auth-tab ${tab === "login" ? "active" : ""}`}
                    onClick={openLogin}
                    type="button"
                >
                    Login
                </button>
                <button
                    className={`auth-tab ${tab === "signup" ? "active" : ""}`}
                    onClick={openSignup}
                    type="button"
                >
                    Signup
                </button>
                </div>

                {/* Login Form */}
                {tab === "login" && (
                <form className="auth-form" onSubmit={onLogin}>

                    <h3 className="auth-title">Login Form</h3>

                    <div className="google-btn-wrapper">
                        <GoogleLogin
                            onSuccess={(credentialResponse)=>handleGoogleLogin(credentialResponse)}
                            onError={() => {
                                console.log("Google Login Failed");
                            }}
                        />
                    </div>
                    <p className="auth-divider"><span>OR</span></p>

                    <input
                    className="auth-input"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    />

                    <input
                    className="auth-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    />

                    <p className="auth-link" onClick={() => setShowForgot(true)}>Forgot password?</p>

                    <button className="auth-submit" type="submit">Login</button>

                    <p className="auth-switch">
                    Not a member?
                    <span onClick={openSignup}> Signup now</span>
                    </p>
                </form>
                )}

                {/* Signup Form */}
                {tab === "signup" && (
                <form className="auth-form" onSubmit={onSignup}>

                    <h3 className="auth-title">Signup Form</h3>

                    <div className="google-btn-wrapper">
                        <GoogleLogin
                            onSuccess={(credentialResponse)=>handleGoogleLogin(credentialResponse)}
                            onError={() => {
                                console.log("Google Login Failed");
                            }}
                        />
                    </div>
                    <p className="auth-divider"><span>OR</span></p>

                    <input
                    className="auth-input"
                    type="text"
                    name="username"
                    placeholder="User Name"
                    />

                    <input
                    className="auth-input"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    />

                    <input
                    className="auth-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    { password && <PasswordRules password={password} />}

                    <input
                    className="auth-input"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    />

                    <button
                        className="auth-submit"
                        type="submit"
                        disabled={isSigningUp}
                    >
                        {isSigningUp ? (
                            <>
                                <FaSpinner className="auth-spinner me-2" />
                                Sending OTP...
                            </>
                        ) : (
                            "Signup"
                        )}
                    </button>
                </form>
                )}
            </div>
            {showOTP && (
                <OTPModal
                    email={signupEmail}
                    type={OTP_TYPES.SIGNUP}
                    onSuccess={(user) => {
                        auth.login_signup(user);
                        navigate(from);
                    }}
                    onClose={() => setShowOTP(false)}
                />
            )}
            {showForgot && (
                <ForgotPasswordModal
                    onClose={() => setShowForgot(false)}
                    from={from}
                />
            )}
        </>
    );
}

export default AuthModal;
