import toast from "react-hot-toast";
import * as profileService from "@/features/profile/services/profileModal.service";


export const updateAvatar = async (e, setPreview, previousImage) => {
    const file = e.target.files[0];
    if (!file) return;

    const oldPreview = previousImage;

    // 🔥 Instant Preview 
    const reader = new FileReader();
    reader.onloadend = () => {
        setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
        const result = await profileService.updateAvatar(formData);

        // After successful upload, replace preview with cloud URL
        setPreview(result.imageUrl);
        toast.success(result.message || "Profile picture updated");

        return result.imageUrl;
    } catch (error) {
        setPreview(oldPreview);
        toast.error(error.message);
    }
};

export const updateUsername = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    if (username.length < 3) {
        toast.error("Username must be at least 3 characters");
        return;
    }

    try {
        const result = await profileService.updateUsername({ username });
        toast.success(result.message || "Username updated successfully");
        return result.username;
    } catch (error) {
        toast.error(error.message);
    }
};
