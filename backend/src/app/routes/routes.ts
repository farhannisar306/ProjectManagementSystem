import { Router } from 'express';
import userRouter from '../controllers/user/user.route';
import authRouter from '../controllers/auth/auth.routes';
const router = Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRouter,
    },
    {
        path: '/auth',
        route: authRouter,
    },
    
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
