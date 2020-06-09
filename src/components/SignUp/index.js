import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import signUpImage from '../../assets/signup.svg';
import { SignInLink } from '../SignIn';

import './styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 100,
  },
  signUp: {},
  signUpOption: {
    marginLeft: 180,
    display: 'inline-block',
  },
  signUpText: {
    margin: theme.spacing(1),
    display: 'inline-block',
  },
  signInImage: {
    width: 400,
    height: 300,
  },
  signInImageWide: {
    width: 400,
    height: 300,
    paddingLeft: 250,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: 'flex',
    width: 330,
  },
  button: {
    margin: theme.spacing(1),
    display: 'inline-block',
  },
}));

const SignUpPage = () => {
  const classes = useStyles();
  const wideScreen = useMediaQuery('(min-width:1300px)');
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs>
        <img
          src={signUpImage}
          alt=""
          className={
            wideScreen ? `${classes.signInImageWide}` : `${classes.signInImage}`
          }
        />
      </Grid>
      <Grid item xs>
        <div className={classes.signUp}>
          <Typography variant="h6" className={classes.signUpText}>
            Sign up
          </Typography>
          <SignInLink />
          <SignUpForm />
        </div>
      </Grid>
    </Grid>
  );
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
    An account with this E-Mail address already exists.
    Try to login with this account instead. If you think the
    account is already used from one of the social logins, try
    to sign-in with one of them. Afterward, associate your accounts
    on your personal account page.
`;

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  isAdmin: false,
  error: null,
};

const SignUpFormBase = (props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const classes = useStyles();

  const onSubmit = (event) => {
    const { username, email, password, isAdmin } = state;
    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        const profile = {
          displayName: username,
        };
        props.firebase.doUpdateProfile(profile);
        props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles,
          })
          .then(() => {
            return props.firebase.doSendEmailVerification();
          })
          .then(() => {
            setState(INITIAL_STATE);
            props.history.push(ROUTES.HOME);
          })
          .catch((error) => {
            if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
              error.message = ERROR_MSG_ACCOUNT_EXISTS;
            }

            setState({ ...state, error });
          });
      })
      .catch((error) => {
        setState({ ...state, error });
      });

    event.preventDefault();
  };

  const onChange = (event) => {
    const signUpInfo = {
      ...state,
      [event.target.name]: event.target.value,
    };
    setState(signUpInfo);
  };

  // const onChangeCheckbox = event => {
  //     setState({ [event.target.name]: event.target.checked });
  // };

  const {
    username,
    email,
    password,
    // isAdmin,
    error,
  } = state;

  const isInvalid = password === '' || email === '' || username === '';

  return (
    <form onSubmit={onSubmit}>
      <TextField
        name="username"
        value={username}
        type="text"
        label="Username"
        className={classes.textField}
        margin="normal"
        onChange={onChange}
      />
      <TextField
        name="email"
        value={email}
        type="email"
        label="Email"
        className={classes.textField}
        margin="normal"
        onChange={onChange}
      />
      <TextField
        name="password"
        value={password}
        type="password"
        label="Password"
        className={classes.textField}
        margin="normal"
        onChange={onChange}
      />
      {/* <label>
                Admin:
                <input
                    name="isAdmin"
                    type="checkbox"
                    checked={isAdmin}
                    onChange={this.onChangeCheckbox}
                />
            </label> */}
      <Button
        disabled={isInvalid}
        className={classes.button}
        variant="contained"
        type="submit"
      >
        Sign Up
      </Button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignUpLink = () => {
  const classes = useStyles();
  return (
    <Typography variant="subtitle1" className={classes.signUpOption}>
      or
      <NavLink to={ROUTES.SIGN_UP} className="signUp">
        Sign Up
      </NavLink>
    </Typography>
  );
};

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
