import {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';
import UserType from "../userType";

const loggedUser = {
    type: UserType,
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
        const user = new User(args.user)

        console.log('args', await user.checkPassword(args.user.password));

        if (await user.checkPassword(args.user.password)) {
            return user;
        }

        return null;
    }
}

export default loggedUser;
