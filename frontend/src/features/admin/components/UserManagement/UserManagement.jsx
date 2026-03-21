import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "@/components/Spinner/Spinner";
import UserCard from "@/features/admin/components/UserCard/UserCard";
import ReviewModal from "@/features/admin/components/ReviewModal/ReviewModal";
import socket from "@/utils/socket";
import * as userManagementHandler from "@/features/admin/handlers/userManagement.handler";

const UserManagement = () => {
    const location = useLocation();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    // 🔥 Decide which API to call based on URL
    const reload = () => {
        if (location.pathname.includes("pending-reviews")) {
            userManagementHandler.fetchPendingReviewUsers(setUsers,setLoading);
        } else {
            userManagementHandler.fetchApprovedReviewUsers(setUsers,setLoading);
        }
    };

    useEffect(() => {
        reload();

        socket.emit("join-admin-room");
        socket.on("review:pending", reload);
        socket.on("review:statusChanged", reload);

        return () => {
            socket.off("review:pending", reload);
            socket.off("review:statusChanged", reload);
        };
    }, [location.pathname]); // 🔥 important

    if (loading && users.length === 0) {
        return <Spinner fullScreen />;
    }

    return (
        <>
            <div className="container-fluid mt-3 position-relative">
                {loading && <Spinner />}

                <div className="row g-3">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="col-12 col-sm-6 col-lg-3"
                        >
                            <UserCard
                                user={user}
                                onSuspend={(id) => userManagementHandler.toggleSuspendUser(id,reload)}
                                onDelete={(id) => userManagementHandler.deleteUser(id,reload)}
                                onShowReviews={(id) => setSelectedUserId(id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {selectedUserId && (
                <ReviewModal
                    userId={selectedUserId}
                    onClose={() => setSelectedUserId(null)}
                    onActionComplete={reload}
                />
            )}
        </>
    );
};

export default UserManagement;