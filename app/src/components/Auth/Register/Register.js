import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Error from '../../Error'
import { Mutation } from 'react-apollo';
import REGISTER_USER_MUTATION from './Register.mutation';
import styles from './Register.scss'
import { setSessionToken } from 'Utils/auth';

const initialState = {
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
        this.setState({ [name]: value });
    }

    handleSubmit = async (event, registerUser) => {
        event.preventDefault();
        registerUser().then(async ({ data, refetch }) => {
            setSessionToken(data.registerUser.sessionToken);
            this.props.setUser(data.registerUser.user)
            location.reload();
            this.clearState();
        })
    }

    validateForm = () => {
        const { email, password, passwordConfirmation } = this.state;
        const isInvalid = !email || !password || passwordConfirmation !== password
        return isInvalid;
    };
    render() {
        const { email, password, passwordConfirmation } = this.state;
        return (
            <Mutation mutation={REGISTER_USER_MUTATION} variables={{ email, password }}>
                {(registerUser, { data, loading, error }) => {
                    return (
                        <form className={styles.container} onSubmit={event => this.handleSubmit(event, registerUser)}>
                            <h1>Register</h1>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Adress"
                                onChange={this.handleChange}
                                value={email} />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={this.handleChange}
                                value={password} />
                            <input
                                type="password"
                                name="passwordConfirmation"
                                placeholder="Confirm Password"
                                onChange={this.handleChange}
                                value={passwordConfirmation} />
                            <button
                                type="submit"
                                disabled={this.validateForm()}
                                className="button-primary"
                            >
                                Submit
                            </button>
                            {error && <Error error={error} />}
                        </form>
                    )
                }}
            </Mutation>
        )
    }
}

export default withRouter(Register);
