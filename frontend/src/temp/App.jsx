import { Routes, Route , useLocation} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Pricing from "@/pages/Pricing/Pricing";
import LandingDashboard from "@/pages/LandingDashboard/LandingDashboard";
import ProfileModal from "@/features/profile/components/ProfileModal/ProfileModal";
import LandingLayout from "@/app/Layout/LandingLayout/LandingLayout";
import AuthModal from "@/features/auth/components/AuthModal/AuthModal";
import ReviewModal from "@/features/reviews/components/ReviewModal/ReviewModal";
import UserRoute from "@/app/routes/UserRoute";

import AdminRoute from "@/app/routes/AdminRoute";
import AdminDashboard from "@/features/admin/pages/AdminDashboard/AdminDashboard";

import UserDashboardLayout from "@/app/Layout/UserDashboardLayout/UserDashboardLayout";
import UserDashboard from "@/features/user/pages/UserDashboard/UserDashboard";
import FileTable from "@/features/user/components/FileTable/FileTable";

import { UsageProvider } from "@/features/user/contexts/UsageContext";
import { FileProvider } from "@/features/user/contexts/FileContext";

function App() {
    const location = useLocation();

    return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
        duration: 3000,
        }}
      />

      {/* MAIN ROUTES */}
      <Routes location={location.state?.background || location}>
        <Route element={<LandingLayout />}>
          <Route path="/" element={<LandingDashboard />} />
          <Route path="/login" element={<AuthModal defaultTab="login" />} />
          <Route path="/signup" element={<AuthModal defaultTab="signup" />} />
          <Route path="/pricing" element={<Pricing/>}/>
          <Route path="/add-review" element={<ReviewModal />} />
          <Route
            path="/profile"
            element={
              <UserRoute>
                <ProfileModal />
              </UserRoute>
            }
          />
        </Route>

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* USER ROUTES */}
        <Route
          path="/user/dashboard/*"
          element={
            // <UserRoute>
              // <UsageProvider>
              //   <FileProvider>
              //     <UserDashboardLayout />
              //   </FileProvider>
              // </UsageProvider>
            // </UserRoute>
            <UsageProvider>
              <FileProvider>
                <UserDashboardLayout />
              </FileProvider>
            </UsageProvider>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="files" element={<FileTable />} />
        </Route>
      </Routes>

      {/* MODAL ROUTE */}
      {location.state?.background && (
        <Routes>
          <Route path="/login" element={<AuthModal defaultTab="login" />} />
          <Route path="/signup" element={<AuthModal defaultTab="signup" />} />
          <Route path="/pricing" element={<Pricing/>}/>
          <Route path="/add-review" element={<ReviewModal />} />
          <Route
            path="/profile"
            element={
              // <UserRoute>
              //   <ProfileModal />
              // </UserRoute>
              <ProfileModal />
            }
          />
        </Routes>
      )}
    </>
  );

};

export default App;
