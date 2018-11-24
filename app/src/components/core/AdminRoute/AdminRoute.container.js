import { connect } from 'react-redux';
import AdminRoute from './AdminRoute';

export default connect(
    (state, ownProps) => ({
        admin: state.loggedUser.admin,
        ownProps: ownProps,
    }),
    {}
)(AdminRoute);
