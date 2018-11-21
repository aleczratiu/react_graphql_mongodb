import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const myPlaintextPassword = 'itech';

const userSchema = new mongoose.Schema({
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

userSchema.methods.encryptPassword = async function encryptPassword(password) {
    console.log('saltRounds', saltRounds, password);
    return bcrypt.hashSync(password, saltRounds);
}

userSchema.methods.checkPassword = async function checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', userSchema);
