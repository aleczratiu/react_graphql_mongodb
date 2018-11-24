import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { removeSessionToken } from 'Utils/auth';
import ROUTES from 'Constants/routes';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Admin from './Admin';
import PublicRoute from './core/PublicRoute';
import PrivateRoute from './core/PrivateRoute';
import EventDisplay from './EventDisplay';
import ConfirmEmail from 'Components/Auth/ConfirmEmail';

class Root extends Component {
    componentWillReceiveProps(nextProps) {
        const { getUserBySessionToken: user, setUser } = nextProps;

        if (!user) {
            removeSessionToken();
        } else {
            setUser(user);
        }
    }

    render() {
        return (
            <Router>
                <Switch>
                    <PrivateRoute exact path={ROUTES.ADMIN} component={Admin.Events.Main} />
                    <PrivateRoute exact path={ROUTES.ADMIN_EVENTS} component={Admin.Events.Main} />
                    {/* <PrivateRoute path={ROUTES.ADMIN_USERS} component={Admin.Users.Main} /> */}
                    <PublicRoute exact path={ROUTES.LOGIN} component={Login} />
                    <PublicRoute exact path={ROUTES.REGISTER} component={Register} />
                    <Route exact path={`${ROUTES.EVENT}/:id`} component={EventDisplay} />
                    <Route exact path={`${ROUTES.CONFIRM_EMAIL}/:id`} component={ConfirmEmail} />
                </Switch>
            </Router>
        )
    }
}

export default Root;
