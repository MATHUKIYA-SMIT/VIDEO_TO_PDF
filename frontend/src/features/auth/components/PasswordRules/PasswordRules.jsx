import { validatePasswordRules } from "@/utils/validators/password.validator";
import "./PasswordRules.css";

function PasswordRules({ password }) {

    const rules =  validatePasswordRules(password);

    return (
        <div className="password-rules">
            <p className={rules.length ? "valid" : "invalid"}>
                <i className={`bi ${rules.length ? "bi-check-circle-fill" : "bi-x-circle-fill"}`}></i>
                At least 7 characters
            </p>

            <p className={rules.lowercase ? "valid" : "invalid"}>
                <i className={`bi ${rules.lowercase ? "bi-check-circle-fill" : "bi-x-circle-fill"}`}></i>
                At least 2 lowercase letters
            </p>

            <p className={rules.uppercase ? "valid" : "invalid"}>
                <i className={`bi ${rules.uppercase ? "bi-check-circle-fill" : "bi-x-circle-fill"}`}></i>
                At least 2 uppercase letters
            </p>

            <p className={rules.numbers ? "valid" : "invalid"}>
                <i className={`bi ${rules.numbers ? "bi-check-circle-fill" : "bi-x-circle-fill"}`}></i>
                At least 2 numbers
            </p>

            <p className={rules.symbol ? "valid" : "invalid"}>
                <i className={`bi ${rules.symbol ? "bi-check-circle-fill" : "bi-x-circle-fill"}`}></i>
                At least 1 special character
            </p>
        </div>
    );
}

export default PasswordRules;