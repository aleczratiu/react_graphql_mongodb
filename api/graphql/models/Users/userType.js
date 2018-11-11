import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean
} from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'User unic id',
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'User email',
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
        },
        admin: {
            type: new GraphQLNonNull(GraphQLBoolean),
        }
    }
})

export default UserType;
