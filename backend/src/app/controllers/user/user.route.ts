import { Router } from 'express';
import { createUser, deleteUser, updateUser } from './user.controller';
import { validate } from '../../middlewares/validate';
import { userSchema } from './user.validate';

const userRouter = Router();

userRouter.post('/create', createUser);
userRouter.delete('/delete/:id', deleteUser);
userRouter.patch('/update/:id', validate(userSchema), updateUser);

export default userRouter;