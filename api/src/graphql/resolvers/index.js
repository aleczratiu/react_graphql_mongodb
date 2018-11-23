import { NotFound, Unauthorized } from '../../utils/errors';

export default {
    Mutation: {
        createSessionToken: async (root, args, { mongo: { Users } }) => {
            const user = await Users.findOne({ email: args.email });

            if (!user) {
                throw new NotFound({
                    message: 'User not found',
                });
            }

            if (!await user.checkPassword(args.password)) {
                throw new Unauthorized({
                    message: 'Email or password wrong',
                });
            }

            return {
                user,
                sessionToken: await user.createSessionToken(),
            };
        },
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
        registerUser: async (root, args, { mongo: { Users } }) => {
            const user = await new Users(args);

            user.password = await user.getEncryptedPassword(args.password);

            await user.save();

            return {
                user,
                sessionToken: await user.createSessionToken(),
            };
        },
    },
    Query: {
        getUserBySessionToken: async (root, args, { mongo: { Users } }) => {
            const token = await Users.verifyToken(args.sessionToken);

            if (!token && !token.user) {
                return null;
            }

            const user = await Users.findById(token.user.id);

            if (!user) {
                return null;
            }

            return user;
        },
    },
};
