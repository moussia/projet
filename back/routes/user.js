import { Router } from 'express';
import { CreateUser } from '../controller/user.js';

const userRouter = Router();

userRouter.post('/create', CreateUser);

export default userRouter;