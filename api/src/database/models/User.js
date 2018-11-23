import mongoose from 'mongoose';
import { config } from '../../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 12;
const secretKey = 'Itec';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});

UserSchema.methods.getEncryptedPassword = async function getEncryptedPassword(password) {
    return bcrypt.hash(password, saltRounds);
};

UserSchema.methods.checkPassword = async function checkPassword(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.createSessionToken = async function createSessionToken() {
    return jwt.sign({
        id: this.id,
    }, config.secret, { expiresIn: '1d' }
    );
};


UserSchema.statics.verifyToken = async function verifyToken(token) {
    try {
        return await jwt.verify(token, config.secret);
    } catch (e) {
        return false;
    }
};


export default mongoose.model('User', UserSchema);
