import { Router } from 'express';
import { createUser, deleteUser, updateUser } from './user.controller';
import { validate } from '../../middlewares/validate';
import { userCreationSchema, userUpdateSchema } from './user.validate';

const userRouter = Router();

userRouter.post('/create', validate(userCreationSchema), createUser);
userRouter.delete('/delete/:id', deleteUser);
userRouter.patch('/update/:id', validate(userUpdateSchema), updateUser);

export default userRouter;