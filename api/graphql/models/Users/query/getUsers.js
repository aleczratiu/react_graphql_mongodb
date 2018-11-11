import { GraphQLObjectType, GraphQLInt, GraphQLList } from 'graphql';
import UserType from '../userType';

const getUsers = {
    type: new GraphQLObjectType({
        name: 'GetUsersType',
        fields: {
            total: {
                type: GraphQLInt,
            },
            users: {
                type: new GraphQLList(UserType),
            },
        },
    }),
    resolve: async (parent, args, { mongo: { User } }) => {
        const users = await User.find({});

        return users;
    }
}

export default getUsers;
