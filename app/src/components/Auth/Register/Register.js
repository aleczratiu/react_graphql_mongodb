import React, { Component, Fragment } from 'react';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }


    handleEmail = (event) => this.setState({ email: event.target.value })

    handlePassword = (event) => this.setState({ password: event.target.value })

    handleRegister = () => {
        const { email, password } = this.state;
        this.props.registerUser({ email, password });
    }

    render() {
        const { email, password } = this.state;

        return (
            <Fragment>
                <input onChange={this.handleEmail} type="email" value={email} />
                <input onChange={this.handlePassword} type="password" value={password} />
                <button onClick={this.handleRegister}>Register</button>
            </Fragment >
        )
    }
}

export default Register;
