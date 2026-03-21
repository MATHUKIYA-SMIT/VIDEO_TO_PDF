import toast from "react-hot-toast";
import { extractFormData } from "@/utils/formUtils";
import * as authService from "@/features/auth/services/authModal.service";
import { isValidPassword } from "@/utils/validators/password.validator";

export const login = async (e, auth, navigate, from, background) => {
    e.preventDefault();

    const data = extractFormData(e.target);

    try {
        const result = await authService.login(data);
        toast.success(result.message || "Login successfully...");
        e.target.reset();

        auth.login_signup(result.user);

        navigate(from, {
            replace: true,
            state: {
                background: background,
            },
        });
    } catch (error) {
        toast.error(error.message);
    }
};

export const googleLogin = async (credentialResponse, auth, navigate) => {
    try {
        const result = await authService.googleLogin(
            credentialResponse.credential
        );
        toast.success(result.message || "Login successfully...");
        auth.login_signup(result.user);
        navigate("/");

    } catch (error) {
        toast.error(error.message);
    }
};

export const signup = async (e, setSignupEmail, setShowOTP) => {
    e.preventDefault();

    const data = extractFormData(e.target);

    const passwordError = isValidPassword(data.password);
    if (passwordError) {
        toast.error("Password does not meet requirements !!");
        return;
    }

    if (data.password !== data.confirmPassword) {
        toast.error("Passwords must match !!");
        return;
    }

    try {
        const result = await authService.signup(data);
        toast.success(result.message || "Sign Up Successfully...");
        setSignupEmail(data.email);
        setShowOTP(true);
    } catch (error) {
        toast.error(error.message);
    }
};

export const logout = async () => {
    try {
        const result = await authService.logout();
        toast.success(result.message || "Logout Successfully...");
        return true;
    } catch (error) {
        toast.error(error.message);
        return false;
    }
};
