import { connect } from 'react-redux';
import { logOut } from '../../../actions/loggedUser';
import PrimarySearchAppBar from './PrimarySearchAppBar';

export default connect(
    null,
    {
        logOut,
    }
)(PrimarySearchAppBar)
