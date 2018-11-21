import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { setUser } from 'Actions/user';
import LOGIN_USER_QUERY from './Login.query';
import Login from './Login';

const LoginWithData = graphql(
    LOGIN_USER_QUERY,
    {
        props: ({ ownProps, mutate }) => ({
            loggedUser: async (variables) => {
                const { data: { loggedUser } } = await mutate({ variables });

                if (loggedUser) {
                    ownProps.setUser({ loggedUser });
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
