import User from '../model/User.js';
import bcrypt from 'bcrypt';
// import { EnvoiMailAuParentPourInscription, sendMailContact } from '../utils/mail.js';
import { roles } from '../constants/Roles.js';
import jwt from 'jsonwebtoken';

export const CreateUser = async (req, res) => {
    console.log("CreateUser, route: /create");
    try {
        // create and save new player in DB
        const { email, password, firstname, lastname, alias, phone, address, city, country, zipcode, sex } = req.body;
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
            role: roles.USER
        });
        await user.save();
        // sellerRegisterEmail(req.body.email, req.body.name, req.body.email);
        // const link = jwt.sign({
        //     data: { _id: user._id }
        // }, process.env.JWT_ACTIVATE, { expiresIn: '24h' });
        // EnvoiMailAuParentPourInscription(email, lastname, firstname, `${process.env.URL_FRONT}/activatedMail?token=${link}`);
        // comme mot de passe oublié, genere un token jwt que jenvoie par email et je change le template pour le mail
        res.sendStatus(200);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

}