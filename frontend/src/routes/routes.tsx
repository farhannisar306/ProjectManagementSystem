import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Homepage from '../pages/HomePage';
// import LoginPage from '@/pages/LoginPage';
// import SignupPage from '@/pages/SignupPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <Homepage />,
            },
        ],
    },
    // {
    //     path: "/login",
    //     element: <LoginPage />,
    // },
    // {
    //     path: "/signup",
    //     element: <SignUpPage />,
    // },
]);

export default router;