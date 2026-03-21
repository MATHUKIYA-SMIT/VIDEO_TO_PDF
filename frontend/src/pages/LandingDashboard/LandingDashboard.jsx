import HeroSection from "@/components/Home/HeroSection/HeroSection";
import UrlConverter from "@/features/url/components/UrlConverter/UrlConverter";
import BenefitsSection from "@/components/Home/BenefitsSection/BenefitsSection";
import HowToUseSection from "@/components/Home/HowToUseSection/HowToUseSection";
import WhyConvertSection from "@/components/Home/WhyConvertSection/WhyConvertSection";
import ReviewSection from "@/features/reviews/components/ReviewSection/ReviewSection";
import Footer from "@/components/Footer/Footer";
import "./LandingDashboard.css";

function LandingDashboard() {

    return (
        <>
            <main>
                <HeroSection />
                <UrlConverter />
                <BenefitsSection />
                <HowToUseSection />
                <WhyConvertSection />
                <ReviewSection/>
            </main>
            <Footer />
        </>
    );
}

export default LandingDashboard;


