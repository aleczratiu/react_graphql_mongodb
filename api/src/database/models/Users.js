import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../config';

const Users = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: Boolean,
    confirmed: {
        type: Boolean,
        default: false,
    },
    subscribe: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

Users.methods.getEncryptedPassword = async function getEncryptedPassword(password) {
    return bcrypt.hash(password, config.saltRounds);
};

Users.methods.checkPassword = async function checkPassword(password) {
    return bcrypt.compare(password, this.password);
};

Users.methods.createSessionToken = async function createSessionToken(expiresIn = '1d') {
    return jwt.sign({ id: this.id }, config.secret, { expiresIn });
};

Users.statics.verifyToken = async function verifyToken(token) {
    try {
        return await jwt.verify(token, config.secret);
    } catch (e) {
        return false;
    }
};

export default mongoose.model('Users', Users);
