import toast from "react-hot-toast";
import * as usageService from "../services/sidebar.service";

export const getUsage = async () => {
    try {
        return await usageService.getUsage();
    } catch (err) {
        toast.error(err.message);
        console.error(err.message);
    }
};
