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
    image: {
        default: '',
        type: String,
    },
    questions: {
        default: [],
        type: [{
            ref: 'Questions',
            type: mongoose.Schema.Types.ObjectId,
        }],
    },
}, {
    timestamps: true,
});

export default mongoose.model('Events', Events);
