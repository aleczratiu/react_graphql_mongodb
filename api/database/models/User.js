import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 12;

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

export default mongoose.model('User', UserSchema);
