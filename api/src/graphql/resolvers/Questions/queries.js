import { toObjectId } from '../../../utils/mongoose';

export default {
    getQuestions: async (root, args, { mongo: { Questions } }) => {
        // @todo: validations
        // @todo: use Questions.populate()
        return Questions.find({});
    },
    getQuestionsByEventId: async (root, args, { mongo: { Questions } }) => Questions.find({ events: toObjectId(args.eventId) }),
};
