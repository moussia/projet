import { Router } from 'express';
import { closeChat, isChatExist } from '../controller/chat.js';
import { activatedMail, modifPassword, resetPassword, SendEmailForForgePassword } from '../controller/login.js';
import { createPayment } from '../controller/payment.js';
import { CreateUser } from '../controller/user.js';

const userRouter = Router();

userRouter.post('/create', CreateUser);

export default userRouter;