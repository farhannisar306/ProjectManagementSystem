import { Router } from 'express';
import { userController } from './user.controller';
import { validate } from '../../middlewares/validate';
import { userCreationSchema, userLoginSchema, userUpdateSchema } from './user.validate';
import { isAuthenticate } from '../../middlewares/isAuthenticated';

const userRouter = Router();
//CRUD
userRouter.post('/create', validate(userCreationSchema), userController.createUser);
userRouter.delete('/delete/:id', isAuthenticate, userController.deleteUser);
userRouter.patch('/update/:id', isAuthenticate, validate(userUpdateSchema), userController.updateUser);

export default userRouter;

//user types his creds, then he presses submit,