import React, { useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { compose } from 'recompose';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import SvgIcon from '@material-ui/core/SvgIcon';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import signInBird from '../../assets/signIn.png';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 100
    },
    line: {
        width: 350,
    },
    signInImage: {
        width: 300,
        height: 300,
        paddingLeft: 150
    },
    signIn: {
        paddingLeft: 150,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        display: "flex",
        width: 330
    },
    button: {
        margin: theme.spacing(1),
        display: "inline-block"
    },
    googleButton: {
        margin: theme.spacing(1),
        width: 330,
        marginTop: 30
    },
    googleIcon: {
        marginRight: 20,
    },
    signInText: {
        margin: theme.spacing(1),
        display: "inline-block"
    },
    divider: {
        margin: theme.spacing(1),
        width: 150,
        display: "inline-block"
    },
    or: {
        display: "inline-block",
        position: "relative",
        top: -5
    }
}));

const SignInPage = () => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:1100px)');
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs>
                    <img src={signInBird} alt="signIn" className={classes.signInImage} />
                </Grid>
                <Grid item xs>
                    <div className={matches ? "" : `${classes.signIn}`}>
                        <Typography variant="h6" className={classes.signInText}>Sign in</Typography>
                        <SignUpLink />
                        <SignInGoogle />
                        <div className={classes.line}>
                        <Divider className={classes.divider} />
                            <Typography variant="subtitle1" className={classes.or} >or</Typography>
                        <Divider className={classes.divider} />
                        </div>
                        
                        <SignInForm />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

const SignInLink = () => {
    return (
        <Typography variant="subtitle1">
            or
            <NavLink 
                to={ROUTES.SIGN_IN}
            >Sign In</NavLink>
        </Typography>
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
                setState({...state, error});
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
            <PasswordForgetLink />

            {error && <p>{error.message}</p>}
        </form>
    );
}


const SignInGoogleBase = (props) => {
    const [error, setError] = useState({ error: null });
    const classes = useStyles();

    const onSubmit = event => {
        props.firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                // Create a user in your Firebase Realtime Database too
                return props.firebase
                    .user(socialAuthUser.user.uid)
                    .set({
                        username: socialAuthUser.user.displayName,
                        email: socialAuthUser.user.email,
                        roles: [],
                    });
            })
            .then(() => {
                setError({ error: null });
                props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                
                setError({ error });
            });
        
        event.preventDefault();
    };

    return (
        <form onSubmit={onSubmit}>
            <Button variant="contained" color="primary" className={classes.googleButton} aria-label="signInGoogle" type="submit">
                <SvgIcon className={classes.googleIcon}>
                    <path fill="#ffffff" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
                </SvgIcon>
                Sign In with Google
            </Button>

            {error && <p>{error.message}</p>}
        </form>
    );
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

export { SignInForm, SignInGoogle, SignInLink };