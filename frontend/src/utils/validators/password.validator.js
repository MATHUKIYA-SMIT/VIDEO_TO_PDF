export const validatePasswordRules = (password = "") => {

    const lowerCaseMatches = password.match(/[a-z]/g) || [];
    const upperCaseMatches = password.match(/[A-Z]/g) || [];
    const numberMatches = password.match(/[0-9]/g) || [];
    const symbolMatches = password.match(/[^A-Za-z0-9]/g) || [];

    return {
        length: password.length >= 7,
        lowercase: lowerCaseMatches.length >= 2,
        uppercase: upperCaseMatches.length >= 2,
        numbers: numberMatches.length >= 2,
        symbol: symbolMatches.length >= 1,
    };
};

export const isValidPassword = (password) => {
    const rules = validatePasswordRules(password);

    const isValid = Object.values(rules).every(Boolean);

    return isValid ? null : rules;
};