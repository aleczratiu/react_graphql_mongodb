export default {
    getQuestions: async (root, args, { mongo: { Questions } }) => Questions.find({}),
};
