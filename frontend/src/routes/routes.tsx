import { createBrowserRouter } from 'react-router-dom';
import InvalidURLPage from '../pages/auth/Invalid-URL-Page';
import HomePage from '../pages/home/Home-Page';
import SignupPage from '../pages/Sign-Up-Page';
import LoginPage from '../pages/Login-Page';
import VerifyEmailPage from '../pages/auth/Verify-Email-Page';
import ProtectedLayout from '../layouts/Protected-Layout';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },


    {
        path: "/auth/verify-email/:token",
        element: <VerifyEmailPage />,
    },

    {
        path: "/",
        element: <ProtectedLayout />,
        children: [
            {
                path: "test",
                children: [
                    {
                        index: true,
                        element: <InvalidURLPage />,
                    },
                ]
            },

        ],
    },

    {
        path: "*",
        element: <InvalidURLPage />,
    }

]);

export default router;