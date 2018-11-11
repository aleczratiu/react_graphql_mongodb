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
        console.log(args);
    }
}

export default registerUser;
