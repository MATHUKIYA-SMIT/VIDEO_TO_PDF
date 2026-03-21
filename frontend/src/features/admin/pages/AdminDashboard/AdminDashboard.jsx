import DashboardStats from "@/features/admin/components/DashboardStats/DashboardStats.jsx";
import UserManagement from "@/features/admin/components/UserManagement/UserManagement.jsx";

function AdminDashboard() {
  return (
    <>
      <main>
        <DashboardStats />
        <UserManagement />
      </main>
    </>
  );
}

export default AdminDashboard;