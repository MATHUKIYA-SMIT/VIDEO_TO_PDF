const AppError = require("../AppError");

exports.validatePassword = (password) => {

    const errors = [];

    if (password.length < 7) {
        errors.push("Password must be at least 7 characters long");
    }

    const lowerCaseMatches = password.match(/[a-z]/g) || [];
    const upperCaseMatches = password.match(/[A-Z]/g) || [];
    const numberMatches = password.match(/[0-9]/g) || [];
    const symbolMatches = password.match(/[^A-Za-z0-9]/g) || [];

    if (lowerCaseMatches.length < 2) {
        errors.push("Password must contain at least 2 lowercase letters");
    }

    if (upperCaseMatches.length < 2) {
        errors.push("Password must contain at least 2 uppercase letters");
    }

    if (numberMatches.length < 2) {
        errors.push("Password must contain at least 2 numbers");
    }

    if (symbolMatches.length < 1) {
        errors.push("Password must contain at least 1 special character");
    }

    if (errors.length > 0) {
        throw new AppError(errors, 400);
    }
};