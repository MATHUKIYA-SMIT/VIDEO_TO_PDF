import useIsMobile from "@/features/navbar/hooks/useIsMobile";
import DesktopNavbar from "./DesktopNavbar/DesktopNavbar";
import MobileNavbar from "./MobileNavbar/MobileNavbar";

export default function Navbar() {
    const isMobile = useIsMobile(768);

    return isMobile ? <MobileNavbar /> : <DesktopNavbar />;
}
