import toast from "react-hot-toast";
import * as deleteAccountService from "@/features/profile/services/deleteAccountModal.service";

export const deleteAccount = async () => {
    try {
        const result = await deleteAccountService.deleteAccount();
        toast.success(result.message || "Account deleted successfully...");
        return true;
    } catch (err) {
        toast.error(err.message || "Account is not deleted...");
        return false;
    }
};