import React, { useState, Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import signInBird from '../../assets/signIn.png';


const useStyles = makeStyles(theme => ({
    root: {
        margin: 100
      },
    signInImage: {
        width: 300,
        height: 300,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    signInText: {
        margin: theme.spacing(1),
    }
}));

const SignInPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs>
                    <img src={signInBird} alt="signIn" className={classes.signInImage} />
                </Grid>
                <Grid item xs>
                    <SignInForm />
                    <SignUpLink />
                    <SignInGoogle />
                    <PasswordForgetLink />
                </Grid>
            </Grid>
        </div>
    );
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
    An account with an E-Mail address to
    this social account already exists. Try to login from
    this account instead and associate your social accounts on
    your personal account page.
`;

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

const SignInFormBase = (props) => {
    const [state, setState] = useState(INITIAL_STATE);
    const classes = useStyles();

    const onSubmit = event => {
        const { email, password } = state;

        props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                setState(INITIAL_STATE);
                props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                setState(...state, error);
            });

        event.preventDefault();
    };

    const onChange = event => {
        const signInInfo = {
            ...state,
            [event.target.name]: event.target.value,
        };
        setState(signInInfo);
    };


    const { email, password, error } = state;
    const isInvalid = password === '' || email === '';

    return (
        <form onSubmit={onSubmit}>
            <Typography variant="h6" className={classes.signInText}>Sign in</Typography>
            <TextField
                name="email"
                value={email}
                type="email"
                label="Email"
                className={classes.textField}
                autoComplete="email"
                margin="normal"
                onChange={onChange}
            />
            <TextField
                name="password"
                value={password}
                type="password"
                label="Password"
                className={classes.textField}
                autoComplete="current-password"
                margin="normal"
                onChange={onChange}                    
            />
            <Button disabled={isInvalid} className={classes.button} variant="contained" type="submit">
                Sign In
            </Button>

            {error && <p>{error.message}</p>}
        </form>
    );
}


class SignInGoogleBase extends Component {
    constructor(props) {
        super(props);

        this.state = { error: null };
    }

    onSubmit = event => {
        this.props.firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                // Create a user in your Firebase Realtime Database too
                return this.props.firebase
                    .user(socialAuthUser.user.uid)
                    .set({
                        username: socialAuthUser.user.displayName,
                        email: socialAuthUser.user.email,
                        roles: [],
                    });
            })
            .then(() => {
                this.setState({ error: null });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                
                this.setState({ error });
            });
        
        event.preventDefault();
    };

    render() {
        const { error } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <button type="submit">Sign In with Google</button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
    withRouter,
    withFirebase,
)(SignInGoogleBase);

export default SignInPage;

export { SignInForm, SignInGoogle };