import UrlConverter from "@/features/url/components/UrlConverter/UrlConverter";
import UpgradeCard from "@/features/user/components/UpgradeCard/UpgradeCard";
import FileTable from "@/features/user/components/FileTable/FileTable";

const UserDashboard = () => {
    return (
        <>
            <UpgradeCard/>
            <UrlConverter/>
            <FileTable/>
        </>
    );
};

export default UserDashboard;
