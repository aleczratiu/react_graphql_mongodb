import Events from './Events';
import Questions from './Questions';
import Users from './Users';

export default {
    Mutation: {
        ...Events.mutations,
        ...Questions.mutations,
        ...Users.mutations,
    },
    Query: {
        ...Users.queries,
    },
};
