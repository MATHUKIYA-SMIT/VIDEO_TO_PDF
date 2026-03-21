import "./WhyConvertSection.css";

const whyConvertData = [
    { title: "save costs", text: "Videos are bulky to share and store" },
    { title: "slides plz", text: "Many cases, all you want are slides, not the video" },
    { title: "slowwww", text: "Many videos are tooo long to stay awake!" },
    { title: "search", text: "Finding, copying content inside a video is hard" },
    { title: "seek", text: "Jumping back and forth is painful" },
    { title: "slow pace", text: "Must keep up with the speaker's pace, slow or fast" },
    { title: "get idea?", text: "Watching at 2x doesn't allow deep understanding" },
    { title: "hard2focus", text: "Videos need your unwavering attention" },
    ];

const WhyConvertSection = () => {
    return (
        <section className="why-section py-5">
            <div className="container">

                <h2 className="why-convert-title text-center mb-5">
                Why Convert Videos into Doc?
                </h2>

                <div className="row g-4">
                {whyConvertData.map(({ title, text }) => (
                    <div
                    key={title}
                    className="col-xl-3 col-lg-4 col-md-6"
                    >
                    <div className="why-card h-100">
                        <div className="icon-title">
                        <i className="bi bi-play-btn-fill"></i>
                        <span>{title}</span>
                        </div>
                        <p>{text}</p>
                    </div>
                    </div>
                ))}
                </div>

            </div>
        </section>
    );
};

export default WhyConvertSection;
