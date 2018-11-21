// Dependencies
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import App from './App';
import Register from './Auth/Register';
import Login from './Auth/Login';

const Root = () => (
    <Router>
        <Fragment>
            <Route exact path="/" component={App} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
        </Fragment>
    </Router>
)

export default Root;
