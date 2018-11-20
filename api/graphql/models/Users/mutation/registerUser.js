import {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';
import UserType from '../userType';

const registerUser = {
    type: UserType,
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
        user.password = await user.encryptPassword(args.user.password);

        await user.save();

        return user;
    }
}

export default registerUser;
