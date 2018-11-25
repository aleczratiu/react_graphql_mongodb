import Events from './Events';
import Scalars from './Scalars';
import Questions from './Questions';
import Users from './Users';

export default {
    ...Scalars,
    Mutation: {
        ...Events.mutations,
        ...Questions.mutations,
        ...Users.mutations,
    },
    Query: {
        ...Events.queries,
        ...Questions.queries,
        ...Users.queries,
    },
};
