export const setThemeCookie = (theme) => {
  document.cookie = `theme=${theme}; path=/; max-age=86400`;
};

export const getThemeCookie = () => {
    const match = document.cookie.match(/(^| )theme=([^;]+)/);
    return match ? match[2] : null;
};
