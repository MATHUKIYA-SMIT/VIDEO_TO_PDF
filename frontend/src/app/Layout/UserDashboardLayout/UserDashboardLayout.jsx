import { Outlet } from "react-router-dom";
import Sidebar from "@/features/user/components/Sidebar/Sidebar";
import "./UserDashboardLayout.css";

const UserDashboardLayout = () => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content">
                <Outlet />
            </div>
        </div>
    );
};

export default UserDashboardLayout;
