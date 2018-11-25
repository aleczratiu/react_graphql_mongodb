import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import classNames from 'classnames';
import validator from 'validator';
import Error from 'Components/core/Error';
import { setSessionToken } from 'Utils/auth';
import LOGIN_USER_QUERY from './Login.mutation';
import style from './Login.scss';

const initialState = {
    email: "",
    password: "",
};

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        flexBasis: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    button: {
        margin: theme.spacing.unit,
        width: 200
    },
    input: {
        display: 'none',
    },
});

class Login extends Component {

    state = { ...initialState };

    clearState = () => {
        this.setState({ ...initialState });
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });

    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleSubmit = (event, loggedUser) => {
        event.preventDefault();
        loggedUser().then(async ({ data }) => {
            this.props.setUser(data.createSessionToken.user)
            setSessionToken(data.createSessionToken.sessionToken);
            location.reload();
            this.clearState();
        })
    }

    validateForm = () => {
        const { password, email } = this.state;
        const isInvalid = !validator.isEmail(email) || !password

        return isInvalid;
    };
    render() {
        const { email, password, showPassword } = this.state;
        const { classes } = this.props;
        return (
            <Mutation mutation={LOGIN_USER_QUERY} variables={{ email, password }}>
                {(loggedUser, { data, loading, error }) => {
                    return (
                        <form
                            className={classNames(classes.container, style.container)}
                            noValidate
                            autoComplete="off"
                            onSubmit={event => this.handleSubmit(event, loggedUser)}
                        >
                            <h1>Login</h1>
                            <FormControl className={classNames(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="adornment-password1">Email</InputLabel>
                                <Input
                                    id="adornment-password1"
                                    type={email}
                                    value={email}
                                    name="email"
                                    onChange={this.handleChange}
                                />
                            </FormControl>
                            <FormControl className={classNames(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="adornment-password2">Password</InputLabel>
                                <Input
                                    id="adornment-password2"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    name="password"
                                    onChange={this.handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                type="submit"
                                disabled={this.validateForm()}
                            >
                                Submit
                                </Button>
                            {error && <Error error={error} />}
                        </form>
                    )
                }}
            </Mutation>
        )
    }
}

export default withRouter(withStyles(styles)(Login));
