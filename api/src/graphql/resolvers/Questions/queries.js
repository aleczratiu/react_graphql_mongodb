import { toObjectId } from '../../../utils/mongoose';

export default {
    getQuestions: async (root, args, { mongo: { Questions } }) => {
        // @todo: validations
        return Questions.find({}).populate('events');
    },
    getQuestionsByEventId: async (root, args, { mongo: { Questions } }) => Questions.find({ events: toObjectId(args.eventId) }),
};
