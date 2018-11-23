import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean
} from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'UserAuthType',
    fields: {
        user: {
            id: {
                type: GraphQLID,
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
        },
        sessionToken: {
            type: new GraphQLNonNull(GraphQLString),
        }
    }
})

export default UserType;
