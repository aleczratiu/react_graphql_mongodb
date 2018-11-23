import mongoose from 'mongoose';

const Events = new mongoose.Schema({
    description: {
        required: true,
        type: String,
    },
    questions: {
        default: [],
        type: [String],
    },
    title: {
        required: true,
        type: String,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Events', Events);
