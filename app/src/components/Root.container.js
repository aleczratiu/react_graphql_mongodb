import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { setUser } from 'Actions/loggedUser';
import GET_USER_BY_SESSION_TOKEN from './Root.mutation';
import { getSessionToken } from 'Utils/auth';
import Root from './Root';

const sessionToken = getSessionToken();

const RootWithData = graphql(GET_USER_BY_SESSION_TOKEN, {
    options: {
        variables: {
            sessionToken,
        },
    },
    props: ({ data }) => data,
    skip: !sessionToken,
})(Root);

export default connect(
    () => ({
        sessionToken,
    }),
    {
        setUser,
    },
)(RootWithData);
