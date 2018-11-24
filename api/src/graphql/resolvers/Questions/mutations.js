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
        const question = Questions.findByIdAndDelete(args.id);
        // @todo: validations

        return question.save();
    },
    editQuestion: async (root, args, { mongo: { Questions } }) => {
        // @todo: validations
        return Questions.findByIdAndUpdate(args.id, args, { new: true });
    },
};
