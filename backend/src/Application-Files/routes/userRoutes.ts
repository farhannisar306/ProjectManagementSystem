import { Router } from 'express';
import { createUser, deleteUser, updateUser } from '../controllers/userContorller';

const userRouter = Router();

userRouter.post('/create', createUser);
userRouter.delete('/delete/:id', deleteUser);
userRouter.patch('/update/:id', updateUser);

export default userRouter;