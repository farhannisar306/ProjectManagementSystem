import { Router } from 'express';
import { createUser, deleteUser } from '../controllers/userContorller';

const userRouter = Router();

userRouter.post('/create', createUser);
userRouter.delete('/delete/:id', deleteUser);

export default userRouter;