import { Router } from 'express';
import { closeChat, isChatExist } from '../controller/chat.js';
import { activatedMail, modifPassword, resetPassword, SendEmailForForgePassword } from '../controller/login.js';
import { createPayment } from '../controller/payment.js';
import { createPro } from '../controller/pro.js';
import { closeReservation, createDemandeReservation, finishReservation, historiqueForParent } from '../controller/reservation.js';
import { createParent, currentUser, sendMailFromContact, updateUser } from '../controller/user.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { isParent } from '../middleware/isAuthorized.js';
// import { ValidateParentSignup } from '../middleware/Validators/SignUp.js';
import { ValidateProSignup } from '../middleware/Validators/SignUpPro.js';

const userRouter = Router();

userRouter.post('/create', ValidateParentSignup, createParent);

export default userRouter;