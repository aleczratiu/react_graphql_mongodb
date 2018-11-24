import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Error from '../../Error'
import { Mutation } from 'react-apollo';
import REGISTER_USER_MUTATION from './Register.mutation';
import style from './Register.scss'
import { setSessionToken } from 'Utils/auth';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import validator from 'validator';

const initialState = {
    email: "",
    password: "",
    passwordConfirmation: "",
    showPassword: false,
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

class Register extends Component {

    state = { ...initialState };

    clearState = () => {
        this.setState({ ...initialState });
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async (event, registerUser) => {
        event.preventDefault();
        registerUser().then(async ({ data, refetch }) => {
            // console.log(data);
            setSessionToken(data.registerUser.sessionToken);
            this.props.setUser(data.registerUser.user);
            // await this.props.refetch();
            this.clearState();
            // this.props.history.push('/');
        })
    }

    validateForm = () => {
        const { email, password, passwordConfirmation } = this.state;
        const isInvalid = !validator.isEmail(email) || !password || passwordConfirmation !== password
        return isInvalid;
    };
    render() {
        const { email, password, passwordConfirmation, showPassword} = this.state;
        const { classes } = this.props;
        return (
            <Mutation mutation={REGISTER_USER_MUTATION} variables={{ email, password }}>
                {(registerUser, { data, loading, error }) => {
                    return (
                            <form
                                className={classNames(classes.container, style.container)}
                                noValidate
                                autoComplete="off"
                                onSubmit={event => this.handleSubmit(event, registerUser)}
                            >
                                <h1>Register</h1>
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
                                <FormControl className={classNames(classes.margin, classes.textField)}>
                                    <InputLabel htmlFor="adornment-password3">Confirm Password</InputLabel>
                                    <Input
                                        id="adornment-password-3"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={passwordConfirmation}
                                        name="passwordConfirmation"
                                        onChange={this.handleChange}
                                        endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
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

export default withRouter(withStyles(styles)(Register));
