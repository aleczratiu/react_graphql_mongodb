import { connect } from 'react-redux';
import { setUser } from 'Actions/loggedUser';
import Register from './Register';

export default connect(
    state => ({
        user: state.user,
    }),
    {
        setUser,
    }
)(Register)
