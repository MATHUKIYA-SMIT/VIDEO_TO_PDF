import toast from "react-hot-toast";
import { extractFormData } from "@/utils/formUtils";
import { isValidPassword } from "@/utils/validators/password.validator";
import * as forgotService from "@/features/auth/services/forgotPasswordModal.service";

export const forgotPassword = async (e, setEmail, setPassword, setShowOTP) => {
    e.preventDefault();

    const data = extractFormData(e.target);

    const passwordError = isValidPassword(data.password);
    if (passwordError) {
        toast.error("Password does not meet requirements !!");
        return;
    }

    if (data.password !== data.confirmPassword) {
        toast.error("Password and Confirm-Password must match !!");
        return;
    }

    try {
        const result = await forgotService.forgotPassword(data);

        toast.success(result.message || "Your Password Is Reset...");

        setEmail(data.email);
        setPassword(data.password);
        setShowOTP(true);

    } catch (error) {
        toast.error(error.message);
    }
};
