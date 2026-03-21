export const extractFormData = (form) => {
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
};
