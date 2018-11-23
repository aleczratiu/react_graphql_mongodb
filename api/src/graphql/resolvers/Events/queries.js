export default {
    getEvents: async (root, args, { mongo: { Events } }) => Events.find({}),
};
