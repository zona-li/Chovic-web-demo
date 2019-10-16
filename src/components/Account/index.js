import React, { Component } from 'react';
import { compose } from 'recompose';
import { Elements, StripeProvider } from 'react-stripe-elements';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
import CardForm from './cardForm';

const useStyles = makeStyles(theme => ({
    pageTitle: {
        fontWeight: 500,
    }
}));

const SIGN_IN_METHODS = [
    {
        id: 'password',
        provider: null,
    },
    {
        id: 'google.com',
        provider: 'googleProvider',
    },
];

const AccountPage = () => {
    const classes = useStyles();
    return (
        <AuthUserContext.Consumer>
            {authUser => (
                <div style={{ position: 'absolute', left: '10%', top: '5%', width: '60%'}}>
                    <Typography variant="h5" className={classes.pageTitle}>Account</Typography>
                    <p>{authUser.email}</p>
                    <PasswordChangeForm />
                    <LoginManagement authUser={authUser} />
                    <PaymentInfo authUser={authUser} />
                    <StripeProvider apiKey="pk_test_Qu2iqCKHXB7r5v2nopdcctsg">
                        <div>
                        <h3>Payment Option</h3>
                        <Elements>
                            <CardForm authUser={authUser}/>
                        </Elements>
                        </div>
                  </StripeProvider>
                </div>
            )}
        </AuthUserContext.Consumer>
    );
}

class PaymentInfoBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            last4: null,
        };
    }

    componentDidMount() {
        // Fetch payment card info
        const { firebase, authUser } = this.props;
        const data = firebase.stripe_customer(authUser.uid);
        data.then(docs => {
            docs.forEach(doc => {
                this.setState({ last4: doc.data().last4 });
            });
        }, err => {
            console.log(`Encountered error fetching stripe user: ${err}`);
        });
        
    }

    render() {
        return (
            <p>{this.state.last4 ? `Card on file: ${this.state.last4}` : 'No card on file'}</p>
        );
    }
}

class LoginManagementBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSignInMethods: [],
            error: null,
        };
    }

    componentDidMount() {
        this.fetchSignInMethods();
    }

    fetchSignInMethods = () => {
        this.props.firebase.auth
            .fetchSignInMethodsForEmail(this.props.authUser.email)
            .then(activeSignInMethods =>
                this.setState({ activeSignInMethods, error: null }),
            )
            .catch(error => this.setState({ error }));
    };

    onSocialLoginLink = provider => {
        this.props.firebase.auth.currentUser
            .linkWithPopup(this.props.firebase[provider])
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }));
    };

    onUnlink = providerId => {
        this.props.firebase.auth.currentUser
            .unlink(providerId)
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }));
    };

    onDefaultLoginLink = password => {
        const credential = this.props.firebase.emailAuthProvider.credential(
            this.props.authUser.email,
            password,
        );

        this.props.firebase.auth.currentUser
            .linkAndRetrieveDataWithCredential(credential)
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }));
    };

    render() {
        const { activeSignInMethods, error } = this.state;

        return (
            <div>
                Sign In Methods:
                <ul>
                    {SIGN_IN_METHODS.map(signInMethod => {
                        const onlyOneLeft = activeSignInMethods.length === 1;
                        const isEnabled = activeSignInMethods.includes(signInMethod.id);
                        return (
                            <li key={signInMethod.id}>
                                {signInMethod.id === 'password' ? (
                                    <DefaultLoginToggle
                                        onlyOneLeft={onlyOneLeft}
                                        isEnabled={isEnabled}
                                        signInMethod={signInMethod}
                                        onLink={this.onDefaultLoginLink}
                                        onUnlink={this.onUnlink}
                                    />
                                ) : (
                                    <SocialLoginToggle
                                        onlyOneLeft={onlyOneLeft}
                                        isEnabled={isEnabled}
                                        signInMethod={signInMethod}
                                        onLink={this.onSocialLoginLink}
                                        onUnlink={this.onUnlink}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
                {error && error.message}
            </div>
        );
    }
}

const SocialLoginToggle = ({
    onlyOneLeft,
    isEnabled,
    signInMethod,
    onLink,
    onUnlink,
}) =>
    isEnabled ? (
        <button 
            type="button" 
            onClick={() => onUnlink(signInMethod.id)}
            disabled={onlyOneLeft}
        >
            Deactivate {signInMethod.id}
        </button>
    ) : (
        <button 
            type="button" 
            onClick={() => onLink(signInMethod.provider)}
        >
            Link {signInMethod.id}
        </button>
    );

class DefaultLoginToggle extends Component {
    constructor(props) {
        super(props);

        this.state = { password: '', confirmPassword: '' };
    }

    onSubmit = event => {
        event.preventDefault();

        this.props.onLink(this.state.password);
        this.setState({ password: '', confirmPassword: '' });
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            onlyOneLeft,
            isEnabled,
            signInMethod,
            onUnlink,
        } = this.props;

        const { password, confirmPassword } = this.state;

        const isInvalid =
            password !== confirmPassword || confirmPassword === '';

        return isEnabled ? (
            <button
                type="button"
                onClick={() => onUnlink(signInMethod.id)}
                disabled={onlyOneLeft}
            >
                Deactivate {signInMethod.id}
            </button>
        ) : (
            <form onSubmit={this.onSubmit}>
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="New Password"
                />
                <input
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm new password"
                />

                <button disabled={isInvalid} type="submit">
                    Link {signInMethod.id}
                </button>
            </form>
        )
    }
}

const LoginManagement = withFirebase(LoginManagementBase);
const PaymentInfo = withFirebase(PaymentInfoBase);
const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
    withFirebase,
)(AccountPage);