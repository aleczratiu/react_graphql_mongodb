import React, { Component } from 'react'
import styles from './Login.scss'

const initialState = {
    email: "",
    password: "",
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

    validateForm = () => {
        const { password, email } = this.state;
        const isInvalid = !email || !password

        return isInvalid;
    };
    render(){
        const { email,password } = this.state;
        return (
                <form className={styles.container}>
                <h1>Login</h1>
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
                <button
                    type="submit"
                    disabled={this.validateForm()}
                    className="button-primary"
                    >
                    Submit
                </button>
            </form>
        )
    }
}

export default Register;
