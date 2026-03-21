import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import Spinner from "@/components/Spinner/Spinner";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, isLoggedIn, authLoading } = useAuth();
    const location = useLocation();

    // While checking authentication
    if (authLoading) {
        return <Spinner fullScreen />;
    }

    // Not logged in
    if (!isLoggedIn) {
        if (location.state?.fromLogout) {
            return <Navigate to="/" replace />;
        }
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    // Role restriction (if provided)
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;