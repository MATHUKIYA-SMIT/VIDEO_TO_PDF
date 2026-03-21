import "./UserCard.css";

const UserCard = ({ user, onSuspend, onDelete, onShowReviews }) => {
    return (
        <div className="admin-user-card card p-3">

            <img
                src={user.profile_image || "/images/default-avatar.png"}
                alt="profile"
                className="admin-user-card-avatar rounded-circle mx-auto"
                width="70"
                height="70"
            />

            <h6 className="mt-3 text-center admin-user-card-name">
                {user.username}
            </h6>

            <p className="text-center admin-user-card-email">
                {user.email}
            </p>

            <button
                className="btn btn-sm w-100 mb-2 admin-user-card-review-btn"
                onClick={() => onShowReviews(user.id)}
            >
                Show Reviews
            </button>

            <div className="d-flex gap-2">
                <button
                    className={`btn btn-sm ${
                        user.status === "SUSPENDED"
                            ? "btn-success"
                            : "btn-warning"
                    }`}
                    onClick={() => onSuspend(user.id)}
                >
                    {user.status === "SUSPENDED"
                        ? "Activate"
                        : "Suspend"}
                </button>

                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(user.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default UserCard;