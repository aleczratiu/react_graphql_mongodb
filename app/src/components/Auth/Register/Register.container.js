import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import REGISTER_USER_MUTATION from './Register.mutation';
import { setUser } from 'Actions/user';
import Register from './Register';

const RegisterWithData = graphql(
    REGISTER_USER_MUTATION,
    {
        props: ({ ownProps, mutate }) => ({
            registerUser: async (variables) => {
                const { data: { registerUser }, errors } = await mutate({ variables });
                ownProps.setUser({ registerUser });
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
