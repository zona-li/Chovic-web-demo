import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const useStyles = makeStyles(theme => ({
    text: {
        display: "inline-block"
    },
    link: {
        textDecoration: "none",
        color: "#283593",
        marginLeft: 145
    }
}));

const PasswordForgetPage = () => (
    <div>
        <h1>Password Forget</h1>
        <PasswordForgetForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props){
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, error } = this.state;

        const isInvalid = email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <button disabled={isInvalid} type="submit">
                    Send Password Reset Email
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );  
    }
}

const PasswordForgetLink = () => {
    const classes = useStyles();
    return (
        <Typography variant="subtitle2" className={classes.text} >
            <Link className={classes.link} to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
        </Typography>
    );
};

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };

export default PasswordForgetPage;