import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { getSessionToken } from 'Utils/auth';
import ROUTES from 'Constants/routes';
import NotAdmin from '../NotAdmin';

const AdminRoute = ({ admin, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            getSessionToken() && admin ? (
                <Component {...props} />
            ) : (
                    <NotAdmin />
                )
        )}
    />
);

AdminRoute.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string,
    name: PropTypes.string,
};

AdminRoute.defaultProps = {
    path: '',
    name: null,
};

export default AdminRoute;
