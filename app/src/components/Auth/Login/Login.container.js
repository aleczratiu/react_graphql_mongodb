import { connect } from 'react-redux';
import { setUser } from 'Actions/loggedUser';
import Login from './Login';

export default connect(
    state => ({
        user: state.user,
    }),
    {
        setUser,
    },
)(Login)
