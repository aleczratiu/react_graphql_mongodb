import { GraphQLObjectType } from 'graphql';
import userQuery from './Users/query';

export default new GraphQLObjectType({
    name: 'RootQuery',
    description: 'The root Query type.',
    fields: Object.assign({},
        userQuery,
    ),
})