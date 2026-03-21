import { useNavigate, useLocation } from "react-router-dom";
import "./UpgradeCard.css";

const UpgradeCard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="upgrade-card">
            <div>
                <h3>Upgrade to Pro</h3>
                <p>Convert unlimited videos, get priority processing, and unlock advanced export features.</p>

                <ul className="list">
                    <li>✔ Unlimited Minutes</li>
                    <li>✔ Faster Processing</li>
                    <li>✔ Priority Email Support</li>
                </ul>
            </div>

            <div className="upgrade-footer">
                <div>
                    <span className="price">₹1,999 / year</span>
                    <span className="save">Save 50%</span>
                </div>
                <button
                    className="upgrade-btn"
                    onClick={() =>
                        navigate("/pricing", {
                        state: { background: location }
                        })
                    }
                >
                Upgrade Now
                </button>
            </div>
        </div>
    );
};

export default UpgradeCard;
