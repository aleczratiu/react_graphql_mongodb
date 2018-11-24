import mongoose from 'mongoose';

const Events = new mongoose.Schema({
    description: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    questions: {
        default: [],
        type: [String],
    },
}, {
    timestamps: true,
});

export default mongoose.model('Events', Events);
