import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo';
import Error from '../../Error';
import LOGIN_USER_QUERY from './Login.mutation';
import styles from './Login.scss'

const initialState = {
    email: "",
    password: "",
};
class Login extends Component {

    state = { ...initialState };

    clearState = () => {
        this.setState({ ...initialState });
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({[name]: value});

    }

    handleSubmit = (event, loggedUser) => {
        event.preventDefault();
        loggedUser().then(async ({data}) => {
            console.log(data);
            localStorage.setItem('sessionToken', data.loggedUser.sessionToken);
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/');
        })
    }

    validateForm = () => {
        const { password, email } = this.state;
        const isInvalid = !email || !password

        return isInvalid;
    };
    render(){
        const { email,password } = this.state;
        return (
            <Mutation mutation={LOGIN_USER_QUERY} variables={{ email, password}}>
                {(loggedUser, {data, loading, error}) => {
                    return (
                        <form className={styles.container} onSubmit={event => this.handleSubmit(event,loggedUser)}>
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
                                disabled={loading || this.validateForm()}
                                className="button-primary"
                                >
                                Submit
                            </button>
                            {error && <Error error={error}/>}
                        </form>
                    )
                }}
            </Mutation>
        )
    }
}

export default withRouter(Login);
