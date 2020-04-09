import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 30,
        marginLeft: 100,
        color: "#505050",
    },
    link: {
        textDecoration: "none",
        color: "#283593",
        marginLeft: 10
    },
    button: {
        marginTop: 30,
        marginLeft: 30
    },
}));

const PasswordForgetPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h4">Forgot Your Password?</Typography>
            <Typography variant="subtitle2">Enter your email address here to reset your password.</Typography>
            <PasswordForgetForm />
        </div>
    );
}

const INITIAL_STATE = {
    email: '',
    error: null,
};

const PasswordForgetFormBase = props => {
    const [state, setState] = useState(INITIAL_STATE);
    const classes = useStyles();

    const onSubmit = event => {
        const { email } = state;

        props.firebase
            .doPasswordReset(email)
            .then(() => {
                setState(INITIAL_STATE);
            })
            .catch(error => {
                setState({ error });
            });

        event.preventDefault();
    };

    const onChange = event => {
        setState({ [event.target.name]: event.target.value });
    };

    const { email, error } = state;
    const isInvalid = email === '';

    return (
        <form onSubmit={onSubmit}>
            <TextField
                name="email"
                value={state.email}
                onChange={onChange}
                type="email"
                label="Email"
                margin="normal"
            />
            <Button 
                disabled={isInvalid} 
                color="primary" 
                type="submit" 
                className={classes.button}
                variant="outlined"
            >
                Send
            </Button>

            {error && <p>{error.message}</p>}
        </form>
    );
}

const PasswordForgetLink = () => {
    const classes = useStyles();
    return (
        <Typography variant="subtitle2" >
            <Link className={classes.link} to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
        </Typography>
    );
};

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };

export default PasswordForgetPage;