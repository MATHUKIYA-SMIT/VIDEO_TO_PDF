import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Pricing from "@/pages/Pricing/Pricing";
import LandingDashboard from "@/pages/LandingDashboard/LandingDashboard";
import ProfileModal from "@/features/profile/components/ProfileModal/ProfileModal";
import LandingLayout from "@/app/Layout/LandingLayout/LandingLayout";
import AuthModal from "@/features/auth/components/AuthModal/AuthModal";
import ReviewModal from "@/features/reviews/components/ReviewModal/ReviewModal";

import ProtectedRoute from "@/app/routes/ProtectedRoute";

import AdminDashboardLayout from "@/app/Layout/AdminDashboardLayout/AdminDashboardLayout";
import AdminDashboard from "@/features/admin/pages/AdminDashboard/AdminDashboard";
import UserManagement from "@/features/admin/components/UserManagement/UserManagement";

import UserDashboardLayout from "@/app/Layout/UserDashboardLayout/UserDashboardLayout";
import UserDashboard from "@/features/user/pages/UserDashboard/UserDashboard";
import FileTable from "@/features/user/components/FileTable/FileTable";


function App() {
  const location = useLocation();

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 3000 }}
      />

      <Routes location={location.state?.background || location}>

        {/* PUBLIC ROUTES */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<LandingDashboard />} />
          <Route path="/login" element={<AuthModal defaultTab="login" />} />
          <Route path="/signup" element={<AuthModal defaultTab="signup" />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/add-review" element={<ReviewModal />}/>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileModal />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ADMIN ROUTE */}
        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="pending-reviews" element={<UserManagement />} />
        </Route>

        {/* USER ROUTES */}
        <Route
          path="/user/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="files" element={<FileTable />} />
        </Route>

      </Routes>

      {/* MODAL ROUTES */}
      {location.state?.background && (
        <Routes>
          <Route path="/login" element={<AuthModal defaultTab="login" />} />
          <Route path="/signup" element={<AuthModal defaultTab="signup" />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/add-review" element={<ReviewModal />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileModal />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;