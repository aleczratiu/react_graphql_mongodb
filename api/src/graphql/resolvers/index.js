import { NotFound, Unauthorized } from '../../utils/errors';

export default {
    Mutation: {
        createSessionToken: async (root, args, { mongo: { User } }) => {
            const user = await User.findOne({ email: args.email });

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
        registerUser: async (root, args, { mongo: { User } }) => {
            const user = await new User(args);

            user.password = await user.getEncryptedPassword(args.password);

            await user.save();

            const sessionToken = await user.createSessionToken();

            return {
                user,
                sessionToken: await user.createSessionToken(),
            };
        },
    },
    Query: {
        getUserBySessionToken: async (root, args, { mongo: { User } }) => {
            const token = await User.verifyToken(args.sessionToken);

            if (!token && !token.user) {
                return null;
            }

            const user = await User.findById(token.user.id);

            if (!user) {
                return null;
            }

            return user;
        },
    },
};
