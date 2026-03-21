import "./HowToUseSection.css";

const steps = [
    {
        icon: "bi-link-45deg",
        title: "Step 1",
        text: "Enter URL or Upload a file",
    },
    {
        icon: "bi-grid-1x2",
        title: "Step 2",
        text: "Click convert",
    },
    {
        icon: "bi-download",
        title: "Step 3",
        text: "Your PDF is available to download",
    },
    ];

const HowToUseSection = () => {
    return (
        <section className="steps-wrapper">
            <div className="container my-5">
                <h2 className="steps-title text-center mb-4">How To Use?</h2>

                <div className="row g-4 mx-5">
                    {steps.map(({ icon, title, text }) => (
                    <div key={title} className="col-lg-3 col-md-6">
                        <div className="card step-card h-100">
                            <i className={`bi ${icon} step-icon`}></i>
                            <p className="step-title">{title}</p>
                            <p className="step-text">{text}</p>
                        </div>
                    </div>
                    ))}

                    <div className="col-lg-3 col-md-6">
                        <div className="card step-card locked-card h-100">
                            <i className="bi bi-lock-fill step-icon text-info"></i>
                            <p className="locked-text mt-2">Unlock Full Plan</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HowToUseSection;
