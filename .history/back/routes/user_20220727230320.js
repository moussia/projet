import { Router } from 'express';
import { closeChat, isChatExist } from '../controller/chat.js';
import { activatedMail, modifPassword, resetPassword, SendEmailForForgePassword } from '../controller/login.js';
import { createPayment } from '../controller/payment.js';
import { createPro } from '../controller/pro.js';
import { closeReservation, createDemandeReservation, finishReservation, historiqueForParent } from '../controller/reservation.js';
import { createParent, CreateUser, currentUser, sendMailFromContact, updateUser } from '../controller/user.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const userRouter = Router();

userRouter.post('/create', CreateUser);

export default userRouter;