import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../config';

const UserSchema = new mongoose.Schema({
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
}, {
    timestamps: true,
});

UserSchema.methods.getEncryptedPassword = async function getEncryptedPassword(password) {
    return bcrypt.hash(password, config.saltRounds);
};

UserSchema.methods.checkPassword = async function checkPassword(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.createSessionToken = async function createSessionToken(expiresIn = '1d') {
    return jwt.sign({ id: this.id }, config.secret, { expiresIn });
};

UserSchema.statics.verifyToken = async function verifyToken(token) {
    try {
        return await jwt.verify(token, config.secret);
    } catch (e) {
        return false;
    }
};

export default mongoose.model('User', UserSchema);
