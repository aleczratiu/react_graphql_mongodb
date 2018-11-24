import mongoose from 'mongoose';

const Questions = new mongoose.Schema({
    content: {
        required: true,
        type: String,
    },
    events: {
        default: [],
        type: [{
            ref: 'Events',
            type: mongoose.Schema.Types.ObjectId,
        }],
    },
}, {
    timestamps: true,
});

export default mongoose.model('Questions', Questions);
