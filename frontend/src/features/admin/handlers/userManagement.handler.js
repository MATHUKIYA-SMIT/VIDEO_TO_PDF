import toast from "react-hot-toast";
import * as userManagementService from "@/features/admin/services/userManagement.service";

export const fetchPendingReviewUsers = async (setUsers, setLoading) => {
    try {
        setLoading(true);
        const users = await userManagementService.fetchPendingReviewUsers();
        setUsers(users);
    } catch (error) {
        toast.error(error.message || "Failed to fetch pending review users");
    } finally {
        setLoading(false);
    }
};

export const fetchApprovedReviewUsers = async (setUsers, setLoading) => {
    try {
        setLoading(true);
        const users = await userManagementService.fetchApprovedReviewUsers();
        setUsers(users);
    } catch (error) {
        toast.error("Failed to fetch approved review users");
    } finally {
        setLoading(false);
    }
};

export const toggleSuspendUser = async (id, reload) => {
    try{
        const result = await userManagementService.toggleSuspendUser(id);
        toast.success(result.message || "User status updated successfully...");
        await reload();
    }catch(error){
        toast.error(error.message || "User status is not updated...");
    }
};

export const deleteUser = async (id, reload) => {
    const confirmed = window.confirm("Delete user permanently?");
    if (!confirmed) return;

    try{
        const result = await userManagementService.deleteUser(id);
        toast.success(result.message || "User deleted successfully...");
        await reload();
    }catch(error){
        toast.error(error.message || "User is not deleted...");
    }
};
