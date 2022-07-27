import User from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendToUserForgetPassword } from '../utils/mail.js';


export const Login = async (email, password, done) => {
    console.log("Login, route: /session");

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false);
        }
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return done(null, false);
        }
        if (!user.activated) {
            return done("Activation require");
        }
        if (!user.activatedByAdmin) {
            return done("Activation by admin required");
        }
        return done(null, user);
    } catch (error) {
        // res.sendStatus(400);
        console.log(error);
    }

}

export const Logout = async (req, res) => {
    console.log("Logout, route: /session");

    try {
        if (req.user) req.logOut();
        res.send(200);
    } catch (error) {
        res.sendStatus(400);
    }
}

// Pour que l'utilisateur qui a oublié son mot de passe puisse le modifié.
export const SendEmailForForgePassword = async (req, res) => {
    console.log("SendEmailForForgePassword, route: /forgetPassword");

    try {
        const email = req.body.email;
        const user = await User.findOne({ email });
        if (!user)
            return res.sendStatus(400);
        const link = jwt.sign({
            data: { _id: user._id }
        }, process.env.JWT_RESETPASS, { expiresIn: '1h' });
        sendToUserForgetPassword(email, `${process.env.FRONT_URL}/newPassword?token=${link}`);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }

}

// Pour que l'utilisateur qui a oublié son mot de passe puisse le modifié.
export const resetPassword = async (req, res) => {
    console.log("resetPassword, route: /resetPassword");
    try {
        const confirmation_password = req.body.confirmation_password;
        const token = req.body.token;
        const decodedjwt = jwt.verify(token, process.env.JWT_RESETPASS);
        const hash = await bcrypt.hash(confirmation_password, 10);
        await User.findOneAndUpdate({ _id: decodedjwt.data._id }, { password: hash }, {
            new: true
        });
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
}

export const modifPassword = async (req, res) => {
    console.log("modifPassword, route: /modifPassword");

    try {
        const newPassword = req.body.password;
        const hash = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ _id: req.user._id }, { password: hash }, {
            new: true
        });
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(401);
    }

}

export const activatedMail = async (req, res) => {
    console.log("activatedMail, route: /activatedMail");

    try {
        const token = req.body.token;
        const decodedjwt = jwt.verify(token, process.env.JWT_RESETPASS);
        await User.findOneAndUpdate({ _id: decodedjwt.data._id }, { activated: true }, {
            new: true
        });
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
}