import { NotFound } from "../../../utils/errors";

export default {
    addEvent: async (root, args, { mongo: { Events } }) => {
        // @todo: validations
        return new Events(args).save();
    },
    deleteEvent: async (root, args, { mongo: { Events, Questions } }) => {
        // @todo: validations
        const event = await Events.findById(args.id);
        if (!event) {
            throw new NotFound('Event not found!');
        }
        await Questions.deleteMany({ _id: { $in: event.questions } });
        await Events.deleteOne({ _id: args.id });
        return event;
    },
    editEvent: async (root, args, { mongo: { Events } }) => {
        // @todo: validations
        return Events.findByIdAndUpdate(args.id, args, { new: true }).populate('questions').exec();
    },
};
