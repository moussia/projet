import User from '../model/User.js';
import bcrypt from 'bcrypt';
import { EnvoiMailAuParentPourInscription, sendMailContact } from '../utils/mail.js';
import { roles } from '../constants/Roles.js';
import jwt from 'jsonwebtoken';

export const createParent = async (req, res) => {
    console.log("createparent, route: /create");
    try {
        // create and save new player in DB
        const { email, password, firstname, lastname, phone, address, city, country, zipcode, sex } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hash,
            firstname,
            lastname,
            phone,
            address,
            city,
            country,
            zipcode,
            sex,
            activatedByAdmin: true,
            role: roles.PARENT
        });
        await user.save();
        // sellerRegisterEmail(req.body.email, req.body.name, req.body.email);
        const link = jwt.sign({
            data: { _id: user._id }
        }, process.env.JWT_ACTIVATE, { expiresIn: '24h' });
        EnvoiMailAuParentPourInscription(email, lastname, firstname, `${process.env.URL_FRONT}/activatedMail?token=${link}`);
        // comme mot de passe oublié, genere un token jwt que jenvoie par email et je change le template pour le mail
        res.sendStatus(200);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

}

export const findUser = async (req) => {
    console.log("findUser");

    try {
        const { email } = req.body;
        return await User.findOne({ email });
    } catch (error) {
        // res.sendStatus(400);
        console.error(error);
    }

}

export const currentUser = async (req, res) => {
    console.log("currentUser, route: /current");

    try {
        res.send(req.user);
    } catch (error) {
        res.sendStatus(400);
    }

}

export const updateUser = async (req, res) => {
    console.log("updateUser, route: /update");

    try {
        const updatedUser = await User.findOneAndUpdate({ _id: req.user._id }, req.body);
        res.send(updatedUser);
    } catch (error) {
        res.sendStatus(400);
    }
}

export const getParents = async (req, res) => {
    console.log("getParents, route: /parents");

    try {
        const parents = await User.find({ role: roles.PARENT }, { password: 0 });
        res.send(parents);
    } catch (error) {
        res.sendStatus(400);
    }
}

export const getProFromId = async (req, res) => {
    console.log("getProFromId, route: /pro/:proId");

    try {
        const getPro = await User.findById({ _id: req.params.proId });
        res.send(getPro);
    } catch (err) {
        res.sendStatus(400);
    }
}

export const getParentFromId = async (req, res) => {
    console.log("getParentFromId, route: /parent/:parentId");

    try {
        const getParent = await User.findById({ _id: req.params.parentId });
        res.send(getParent);
    } catch (err) {
        res.sendStatus(400);
    }
}

export const deleteParent = async (req, res) => {
    console.log("deleteParent, route: /parent/:parentId");

    try {
        User.deleteOne({ _id: req.params.parentId })
            .then((data) => res.sendStatus(data !== 0 ? 204 : 404))
    } catch (error) {
        res.sendStatus(400);
    }

}

export const NewPasswordForget = async (req, res) => {
    console.log("NewPasswordForget");

    try {
        const updatedUser = await User.findOneAndUpdate({ _id: req.user._id }, req.body);
        res.send(updatedUser);
    } catch (error) {
        res.sendStatus(400);
    }
}



export const sendMailFromContact = async (req, res) => {
    console.log("sendMailFromContact, route: /sendMailContact");

    try {
        const { name, email, sujet, commentaire } = req.body
        sendMailContact(name, email, sujet, commentaire);
    } catch (error) {
        console.error("error : ", error);
        res.sendStatus(400);
    }

}
