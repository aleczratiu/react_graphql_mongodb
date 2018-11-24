import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { removeSessionToken } from 'Utils/auth';
import ROUTES from 'Constants/routes';
import App from './App';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Admin from './Admin';
import PublicRoute from './core/PublicRoute';
import PrivateRoute from './core/PrivateRoute';
import ConfirmEmail from 'Components/Auth/ConfirmEmail';

class Root extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <PrivateRoute exact path={ROUTES.ROOT} component={App} />
                    <PrivateRoute path={ROUTES.ADMIN} component={Admin.Events.Main} />
                    <PrivateRoute path={ROUTES.ADMIN_EVENTS} component={Admin.Events.Main} />
                    {/* <PrivateRoute path={ROUTES.ADMIN_USERS} component={Admin.Users.Main} /> */}
                    <PublicRoute path={ROUTES.LOGIN} component={Login} />
                    <PublicRoute path={ROUTES.REGISTER} component={Register} />
                    <PrivateRoute path={`${ROUTES.CONFIRM_EMAIL}/:id`} component={ConfirmEmail} />
                </Fragment>
            </Router>
        )
    }
}

export default Root;
