import {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';
import { NotFound, Unauthorized } from '../../../../utils/errors';
import UserAuthType from '../userAuthType';

const createSessionToken = {
    type: UserAuthType,
    args: {
        user: {
            type: new GraphQLInputObjectType({
                name: 'LoggedUserType',
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
    }
}

export default createSessionToken;
