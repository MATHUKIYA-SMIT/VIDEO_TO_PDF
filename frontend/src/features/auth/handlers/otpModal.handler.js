import toast from "react-hot-toast";
import * as otpService from "@/features/auth/services/otpModal.service";
import { OTP_TYPES } from "@/constants/otp.constant";

export const verifyOTP = async (data, onSuccess) => {
    try {

        if (data.type === OTP_TYPES.SIGNUP) {
            const result = await otpService.verifySignupOTP(data);
            toast.success(result.message || "Email Verified Successfully...");
            onSuccess(result.user);
        }

        else if (data.type === OTP_TYPES.RESET) {
            const result = await otpService.verifyResetOTP(data);
            toast.success(result.message || "Password Reset Successfully...");
            onSuccess();
        }

    } catch (error) {
        toast.error(error.message);
    }
};

export const resendOTP = async (data, resetTimer) => {
    try {
        const result = await otpService.resendOTP(data);
        toast.success(result.message || "OTP Resent Successfully...");
        resetTimer();
    } catch (error) {
        toast.error(error.message);
    }
};

export const cancelSignup = async ({ email }) => {
    try {
        const result = await otpService.cancelSignup({ email });
        toast.success(result.message || "SignUp Is Cancelled...");
    } catch (error) {
        toast.error(error.message);
    }
};