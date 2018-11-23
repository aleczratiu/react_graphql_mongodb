import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql';
import UserType from './userType';

const UserAuthType = new GraphQLObjectType({
    name: 'UserAuthType',
    fields: {
        user: {
            type: UserType,
        },
        sessionToken: {
            type: new GraphQLNonNull(GraphQLString),
        }
    }
})

export default UserAuthType;
