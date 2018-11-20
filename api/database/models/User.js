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
    return bcrypt.hashSync(myPlaintextPassword, saltRounds);
}

userSchema.methods.comparePassword = async function comparePassword(password) {
    return await bcrypt.compareSync(password, myPlaintextPassword);
}

export default mongoose.model('User', userSchema);
