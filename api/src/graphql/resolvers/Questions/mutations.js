export default {
    addQuestion: async (root, args, { mongo: { Questions } }) => {
        const question = new Questions(args);

        // @todo: validations
        // @todo: add author id

        return question.save();
    },
    deleteQuestion: async (root, args, { mongo: { Questions } }) => {
        const question = Questions.findByIdAndDelete(args.id);

        // @todo: validations
        // @todo: add author id

        return question.save();
    },
    editQuestion: async (root, args, { mongo: { Questions } }) => {
        const question = Questions.findByIdAndUpdate(args.id, args, { new: true });

        // @todo: validations
        // @todo: add author id

        return question.save();
    },
};
