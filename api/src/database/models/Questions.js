import mongoose from 'mongoose';

const Questions = new mongoose.Schema({
    content: {
        required: true,
        type: String,
    },
    events: {
        default: [],
        type: [String],
    },
}, {
    timestamps: true,
});

export default mongoose.model('Questions', Questions);
