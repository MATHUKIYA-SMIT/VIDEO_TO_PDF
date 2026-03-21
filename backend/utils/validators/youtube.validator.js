export const isValidYoutubeUrl = (url) => {
    if (!url) return false;

    const regex =
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

    return regex.test(url.trim());
};