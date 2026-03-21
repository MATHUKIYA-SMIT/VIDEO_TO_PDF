import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Pricing.css";

function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  const closeModal = () => {
    if (background) {
      navigate(background.pathname);
    } else {
      navigate(-1);
    }
  };

  const plans = [
    {
      name: "Free",
      monthly: 0,
      yearly: 0,
      highlight: false,
      features: [
        "120 minutes of transcription per month",
        "Each file can be up to 30 minutes long. Upload 1 file at a time.",
        "Limited to transcribe 3 files per day",
      ],
    },
    {
      name: "Basic",
      monthly: 799,
      yearly: 599,
      highlight: false,
      features: [
        "1200 minutes of transcription per month",
        "Each file can be up to 10 hours long / 5GB. Upload 50 files at a time.",
        "No daily file limit for transcription",
      ],
    },
    {
      name: "Standard",
      monthly: 1499,
      yearly: 1199,
      highlight: true,
      features: [
        "3000 minutes of transcription per month",
        "Each file can be up to 10 hours long / 5GB. Upload 50 files at a time.",
        "No daily file limit for transcription",
      ],
    },
    {
      name: "Pro",
      monthly: 2499,
      yearly: 1999,
      highlight: false,
      features: [
        "6000 minutes of transcription per month",
        "Each file can be up to 10 hours long / 5GB. Upload 50 files at a time.",
        "No daily file limit for transcription",
      ],
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div className="pricing-overlay" onClick={closeModal}></div>

      {/* Modal */}
      <div className="pricing-modal">

        <button className="pricing-close" onClick={closeModal}>
          ✕
        </button>

        <div className="pricing-container">
          <h1 className="pricing-title">Choose Your Plan</h1>

          {/* Toggle */}
          <div className="pricing-toggle-wrapper">
            <div className="pricing-toggle">
              <button
                className={!isYearly ? "toggle-btn active" : "toggle-btn"}
                onClick={() => setIsYearly(false)}
                type="button"
              >
                Monthly
              </button>
              <button
                className={isYearly ? "toggle-btn active" : "toggle-btn"}
                onClick={() => setIsYearly(true)}
                type="button"
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="row g-4 pricing-row">
            {plans.map((plan, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-3  d-flex">
                <div
                  className={`pricing-card ${
                    plan.highlight ? "highlight" : ""
                  }`}
                >
                  {plan.highlight && (
                    <div className="popular-badge">Most Popular</div>
                  )}

                  <h2 className="plan-name">{plan.name}</h2>

                  <h1 className="price">
                    ₹{isYearly ? plan.yearly : plan.monthly}
                    {plan.name !== "Free" && <span> / month</span>}
                  </h1>

                  {isYearly && plan.name !== "Free" && (
                    <p className="year-note">
                      ₹{plan.yearly * 12} / year billed yearly
                    </p>
                  )}

                  <ul className="feature-list">
                    {plan.features.map((feature, i) => (
                      <li key={i}>
                        <span className="check-icon">
                          <i className="bi bi-check-circle-fill"></i>
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className="subscribe-btn">
                    {plan.name === "Free"
                      ? "Get Started"
                      : "Subscribe Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Pricing;
