import { NotFound } from '../../../utils/errors';

export default {
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
    getUsers: async (root, args, { mongo: { Users } }) => Users.find({}),
    confirmEmail: async (root, args, { mongo: { Users } }) => {
        const user = await Users.findById(args.id);

        if (!user) {
            throw new NotFound({
                message: 'User not found',
            });
        }

        user.confirmed = true;

        await user.save();

        return user;
    }
};
