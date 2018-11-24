import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { getSessionToken } from 'Utils/auth';
import { ROUTES } from 'Constants';

const ConfirmRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            localStorage.getItem('EVENT') ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: ROUTES.REGISTER,
                        }}
                    />
                )
        )}
    />
);

ConfirmRoute.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string,
};

ConfirmRoute.defaultProps = {
    path: '',
};

export default ConfirmRoute;
