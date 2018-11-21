import React, { Component, Fragment } from 'react';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        };
    }

    handleEmail = (event) => this.setState({ email: event.target.value });

    handlePassword = (event) => this.setState({ password: event.target.value });

    handleLoggedUser = () => {
        const { email, password } = this.state;

        this.props.loggedUser({
            email,
            password
        })
    }

    render() {
        const { email, password } = this.state;
        return (
            <Fragment>
                <input type="email" onChange={this.handleEmail} value={email}></input>
                <input type="password" onChange={this.handlePassword} value={password}></input>
                <button onClick={this.handleLoggedUser}>Login</button>
            </Fragment>
        );
    }
}

export default Login;
