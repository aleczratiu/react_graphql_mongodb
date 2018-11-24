export default {
    getEvents: async (root, args, { mongo: { Events } }) => {
        // @todo: validations
        // @todo: use Events.populate()
        return Events.find({});
    },
    getEventById: async (root, { id }, { mongo: { Events } }) => Events.findById(id),
};
