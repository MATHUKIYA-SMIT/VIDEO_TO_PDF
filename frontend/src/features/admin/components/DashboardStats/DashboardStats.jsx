import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner/Spinner";
import socket from "@/utils/socket";
import * as dashboardStatsHandler from "@/features/admin/handlers/dashboardStats.handler";

import "./DashboardStats.css";

const DashboardStats = () => {
    const [stats, setStats] = useState({
        activeUsers: 0,
        suspendedUsers: 0,
        pendingReviews: 0,
        totalPdfs: 0
    });
    const [loading, setLoading] = useState(false);

    const reload = () => dashboardStatsHandler.fetchDashboardStats(setStats, setLoading);

    useEffect(() => {
        reload();

        socket.on("review:pending", () => {
            console.log("userStats get re-render as it is lister from server...");
            reload();
        });
        socket.on("review:statusChanged", () => {
            reload();
        });
        return () => {
            socket.off("review:pending");
            socket.off("review:statusChanged");
        };
    }, []);

    return (
        <div className="container-fluid mt-3 position-relative">
            {loading && <Spinner />}
            <div className="row g-3">
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="stat-card active h-100">
                        <span>Active Users</span>
                        <h2>{stats.activeUsers}</h2>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="stat-card suspend h-100">
                        <span>Suspended Users</span>
                        <h2>{stats.suspendedUsers}</h2>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="stat-card review h-100">
                        <span>Pending Reviews</span>
                        <h2>{stats.pendingReviews}</h2>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="stat-card pdf h-100">
                        <span>Total PDFs</span>
                        <h2>{stats.totalPdfs}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
