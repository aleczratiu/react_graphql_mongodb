import { NotFound, Unauthorized } from '../../utils/errors';

export default {
    Mutation: {
        createSessionToken: async (root, args, { mongo: { User } }) => {
            const user = await User.findOne({ email: args.user.email });

            if (!user) {
                throw new NotFound({
                    message: 'User not found',
                });
            }

            if (!await user.checkPassword(args.user.password)) {
                throw new Unauthorized({
                    message: 'Email or password wrong',
                });
            }

            const sessionToken = await user.createSessionToken();

            return {
                user,
                sessionToken,
            };
        },
        registerUser: async (root, args, { mongo: { User } }) => {
            const user = await new User(args.user);

            user.password = await user.getEncryptedPassword(args.user.password);

            const sessionToken = await user.createSessionToken();

            await user.save();

            return {
                user,
                sessionToken
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
