import mongoose from 'mongoose';
import { roles } from '../constants/Roles.js';
const { Schema, model } = mongoose;

const schema = new Schema({
    lastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    activated: {
        type: Boolean,
        defaultValue: false
    },
    activatedByAdmin: {
        type: Boolean,
        defaultValue: false
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [roles.USER, roles.ADMIN],
        default: roles.USER
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        enum: ['MAN', 'WOMAN'],
        default: 'MAN',
        required: true
    },
    isDisponible: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

export default model('User', schema);