export default {
    addEvent: async (root, args, { mongo: { Events } }) => {
        const event = new Events(args);

        // @todo: validations
        // @todo: add author id

        return event.save();
    },
    deleteEvent: async (root, args, { mongo: { Events } }) => {
        const event = Events.findByIdAndDelete(args.id);

        // @todo: validations
        // @todo: add author id

        return event.save();
    },
    editEvent: async (root, args, { mongo: { Events } }) => {
        const event = Events.findByIdAndUpdate(args.id, args, { new: true });

        // @todo: validations
        // @todo: add author id

        return event.save();
    },
};
