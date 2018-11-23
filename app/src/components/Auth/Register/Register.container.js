import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import REGISTER_USER_MUTATION from './Register.mutation';
import { setSessionToken } from 'Utils/auth';
import { setUser } from 'Actions/user';
import Register from './Register';

const RegisterWithData = graphql(
    REGISTER_USER_MUTATION,
    {
        props: ({ ownProps, mutate }) => ({
            registerUser: async (variables) => {
                const { data: { registerUser: { user, sessionToken } } } = await mutate({ variables });

                await setSessionToken(sessionToken);

                ownProps.setUser(user);
            }
        })
    }
)(Register)

export default connect(
    state => ({
        user: state.user,
    }),
    {
        setUser,
    }
)(RegisterWithData)
