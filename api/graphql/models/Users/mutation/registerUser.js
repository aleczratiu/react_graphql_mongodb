import {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';
import UserAuthType from '../userAuthType';

const registerUser = {
    type: UserAuthType,
    args: {
        user: {
            type: new GraphQLInputObjectType({
                name: 'UserType',
                fields: {
                    email: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    password: {
                        type: new GraphQLNonNull(GraphQLString),
                    }
                }
            })
        },
    },
    resolve: async (parent, args, { mongo: { User } }) => {
        const user = await new User(args.user);

        user.password = await user.getEncryptedPassword(args.user.password);

        const sessionToken = await user.createSessionToken();

        await user.save();

        return {
            user,
            sessionToken
        };
    }
}

export default registerUser;
