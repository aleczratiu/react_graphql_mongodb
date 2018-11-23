import { GraphQLObjectType } from 'graphql';
import userMutation from './Users/mutation/';

export default new GraphQLObjectType({
    name: 'RootMutation',
    description: 'The root Mutation type.',
    fields: Object.assign({},
        userMutation,
    ),
})