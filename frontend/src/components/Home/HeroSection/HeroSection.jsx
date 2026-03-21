import RotatingText from "@/components/RotatingText/RotatingText";
import "./HeroSection.css"

const HeroSection = () => {
    return (
        <header className="RotatingText">
            <h2>
                Trusted by{" "}
                <RotatingText
                words={["Students", "Doctors", "Teachers"]}
                interval={2000}
                />{" "}
                across Top Institutes and Companies
            </h2>

            <p id="introduction">
                YouTube to PDF Notes Converter
            </p>

            <p id="intro_content">
                YouTube video to PDF notes are digital study materials created by
                converting video content into structured, downloadable PDF documents.
            </p>
        </header>
    );
};

export default HeroSection;
