// Dependencies
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import App from './App';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Admin from './Admin';

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
                <Fragment>
                    <Route exact path="/" component={App} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/admin" component={Admin} />
                </Fragment>
            </Router>
        )
    }
}

export default Root;
