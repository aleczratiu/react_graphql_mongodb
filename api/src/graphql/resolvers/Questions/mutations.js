import { NotFound } from "../../../utils/errors";

export default {
    addQuestion: async (root, args, { mongo: { Events, Questions } }) => {
        // @todo: validations
        const event = await Events.findById(args.eventId);
        if (!event) {
            throw new NotFound('Event not found!');
        }
        const question = await new Questions({ ...args, events: [event.id] }).save();
        event.questions = [...event.questions, question.id];
        await event.save();
        return question.populate('events').execPopulate();
    },
    deleteQuestion: async (root, args, { mongo: { Questions } }) => {
        // @todo: validations
        const question = await Questions.findById(args.id);
        if (!question) {
            throw new NotFound('Question not found!');
        }
        await Questions.deleteOne({ _id: args.id });
        return question;
    },
    editQuestion: async (root, args, { mongo: { Questions } }) => {
        // @todo: validations
        return Questions.findByIdAndUpdate(args.id, args, { new: true }).populate('events').exec();
    },
};
