import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { setUser } from 'Actions/user';
import { setSessionToken } from 'Utils/auth';
import LOGIN_USER_QUERY from './Login.mutation';
import Login from './Login';

const LoginWithData = graphql(
    LOGIN_USER_QUERY,
    {
        props: ({ ownProps, mutate }) => ({
            loggedUser: async (variables) => {
                const { data: { createSessionToken: { sessionToken, user } } } = await mutate({ variables });

                if (user && sessionToken) {
                    await setSessionToken(sessionToken);
                    ownProps.setUser({ user });
                }
            }
        })
    }
)(Login)

export default connect(
    state => ({
        user: state.user,
    }),
    {
        setUser,
    },
)(LoginWithData)
