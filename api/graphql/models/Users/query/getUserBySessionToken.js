import { GraphQLString } from 'graphql';
import UserType from './../userType';

const getUserBySessionToken = {
    type: UserType,
    args: {
        sessionToken: {
            type: GraphQLString,
            description: "A user's session token.",
        },
    },
    resolve: async (parent, args, { mongo: { User } }) => {
        console.log('here', args);
        const token = await User.verifyToken(args.sessionToken);

        console.log('token', token);

        if (!token && !token.user) {
            return null;
        }

        const user = await User.findById(token.user.id);

        if (!user) {
            return null;
        }

        return user;
    },
};

export default getUserBySessionToken;
