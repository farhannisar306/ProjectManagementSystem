import { createBrowserRouter } from 'react-router-dom';
// import RootLayout from '../layouts/RootLayout';
import Homepage from '../pages/home/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';

const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <RootLayout/>,
    //     children: [
    //         {
    //             index: true,
    //             element: <Homepage />,
    //         },
    //     ],
    // },
    {
        path: "/",
        element: <Homepage/>,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },
]);

export default router;