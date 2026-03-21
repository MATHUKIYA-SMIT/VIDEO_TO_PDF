import { Outlet } from "react-router-dom";
import AdminSidebar from "@/features/admin/components/AdminSidebar/AdminSidebar";
import "./AdminDashboardLayout.css";

const AdminDashboardLayout = () => {
    return (
        <div className="admin-dashboard-container">
            <AdminSidebar />
            <div className="admin-dashboard-content">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboardLayout;