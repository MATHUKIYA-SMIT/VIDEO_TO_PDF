import toast from "react-hot-toast";
import * as urlConverterService from "@/features/url/services/urlConverter.service";
import { extractFormData } from "@/utils/formUtils";
import { isValidYoutubeUrl } from "@/utils/validators/youtube.validator";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const convertVideo = async (event, setError) => {
    event.preventDefault();

    try {
        const data = extractFormData(event.target);

        const showError = (message) => {
            setError(message);
            setTimeout(() => {
                setError("");
            }, 3000);
        };

        if (!data.url?.trim()) {
            showError("Please enter a YouTube URL.");
            return;
        }

        if (!data.url) {
            toast.error("YouTube Video Url Is Required !!");
            return;
        }

        if (!isValidYoutubeUrl(data.url)) {
            showError("Enter a valid YouTube video URL.");
            return;
        }

        const result = await urlConverterService.convertVideo(data);
        toast.success(result.message || "PDF is created. Download started...");
        window.location.href = `${API_BASE_URL}${result.downloadUrl}`;

    } catch (error) {
        toast.error(error.message);
    }
};
