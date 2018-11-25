export default {
    getEvents: async (root, args, { mongo: { Events } }) => {
        // @todo: validations
        return Events.find({}).populate('questions').exec();
    },
    getEventById: async (root, { id }, { mongo: { Events } }) => {
        // @todo: validations
        return Events.findById(id).populate('questions').exec();
    },
};
