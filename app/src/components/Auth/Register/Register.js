import React, { Component, Fragment } from 'react'
import styles from './Register.scss'

const initialState = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
};
class Register extends Component {

    state = { ...initialState };

    clearState = () => {
        this.setState({ ...initialState });
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({[name]: value});

    }

    handleSubmit = () => {
        const { email, password } = this.state;
        this.props.registerUser({ email, password });
    }

    validateForm = () => {
        const {username,email,password,passwordConfirmation} = this.state;
        const isInvalid = !username || !email || !password || passwordConfirmation !== password

        return isInvalid;
    };
    render(){
        const { username,email,password,passwordConfirmation } = this.state;
        return (
            <div className={styles.container}>
            <h1>Register</h1>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.handleChange}
                    value={username}/>
                <input
                    type="email"
                    name="email"
                    placeholder="Email Adress"
                    onChange={this.handleChange}
                    value={email}/>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    value={password}/>
                <input
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                    value={passwordConfirmation}/>
                <button
                    type="submit"
                    disabled={this.validateForm()}
                    className="button-primary"
                    onClick={this.handleSubmit}
                    >
                    Submit
                </button>
            </div>
        )
    }
}

export default Register;
