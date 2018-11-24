export default {
    addEvent: async (root, args, { mongo: { Events } }) => {
        // @todo: validations
        return new Events(args).save();
    },
    deleteEvent: async (root, args, { mongo: { Events } }) => {
        // @todo: validations
        // @todo: test both findByIdAndDelete and findByIdAndRemove
        return Events.findByIdAndDelete(args.id);
    },
    editEvent: async (root, args, { mongo: { Events } }) => {
        // @todo: validations
        return Events.findByIdAndUpdate(args.id, args, { new: true });
    },
};
