import Navbar from "@/features/navbar/components/Navbar";
import { Outlet } from "react-router-dom";

function LandingLayout() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
}
export default LandingLayout;
