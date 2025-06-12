import { Outlet } from "react-router-dom";
import { useAuth } from "../providers/Authentication-Provider";
import NotAuthenticatedPage from "../pages/auth/Not-Authenticated-Page";


const ProtectedLayout = () => {
    const { authenticated } = useAuth();
    return (
        <div className="w-screen h-screen">
            {authenticated ? <Outlet /> : <NotAuthenticatedPage />}
        </div>
    );
};

export default ProtectedLayout;
