import "./BenefitsSection.css"

const benefitsData = [
    {
        title: "Students",
        description:
        "AI tool converts lengthy lectures and educational videos into concise PDF notes for effective studying and research.",
        color: "primary",
        points: [
        { icon: "bi-journal-text", text: "Summarizing lectures into quick study guides" },
        { icon: "bi-book", text: "Reviewing key concepts before exams" },
        { icon: "bi-file-earmark-text", text: "Generating accurate transcripts for citations" },
        { icon: "bi-clock", text: "Reducing hours of manual note-taking" },
        ],
    },
    {
        title: "Professionals",
        description:
        "Turn long webinars, training sessions, or industry talks into concise summaries for fast knowledge sharing.",
        color: "warning",
        points: [
        { icon: "bi-camera-video", text: "Summarizing hour-long YouTube videos" },
        { icon: "bi-lightbulb", text: "Extracting actionable insights from training" },
        { icon: "bi-people", text: "Sharing key takeaways with colleagues" },
        { icon: "bi-speedometer2", text: "Perfect for quick reviews and productivity" },
        ],
    },
    {
        title: "Teachers",
        description:
        "Create teaching materials directly from educational videos, saving time in lesson planning and preparation.",
        color: "success",
        points: [
        { icon: "bi-file-earmark-pdf", text: "Converting lectures into shareable PDF handouts" },
        { icon: "bi-easel", text: "Generating teaching aids and reference materials" },
        { icon: "bi-stars", text: "Supporting innovative and engaging lesson plans" },
        { icon: "bi-arrow-repeat", text: "Reducing repetitive prep work" },
        ],
    },
    ];

const BenefitsSection = () => {
    return (
        <section className="benefits-wrapper">
            <div className="container my-5">
                <h2 className="benefits-title text-center mb-5">
                Who Can Benefit From AI YouTube to PDF Notes Converter
                </h2>

                <div className="row g-4">
                {benefitsData.map(({ title, description, color, points }) => (
                    <div key={title} className="col-md-4">
                    <div className="benefit-card h-100 p-4">
                        <h3 className="benefit-heading">{title}</h3>
                        <p className="benefit-description">{description}</p>

                        <ul className="list-unstyled mt-3">
                        {points.map(({ icon, text }) => (
                            <li key={text} className="benefit-point">
                            <i className={`bi ${icon} benefit-icon text-${color}`}></i>
                            {text}
                            </li>
                        ))}
                        </ul>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;
