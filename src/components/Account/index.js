import React, { Component } from 'react';
import { compose } from 'recompose';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import PasswordChangeForm from '../PasswordChange';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import './account.css';

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontWeight: 500,
    left: '40%',
    position: 'relative',
  },
  pro: {
    backgroundColor: 'salmon',
    color: 'white',
    borderRadius: '20px',
    width: '40px',
    left: '41%',
    position: 'relative',
  },
  email: {
    marginTop: 90,
  },
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
      {({ authUser, isMember }) => (
        <div className="page">
          <div className="proAccount">
            <Typography variant="h4" className={classes.pageTitle}>
              Account
            </Typography>
            {isMember && (
              <Typography variant="subtitle2" className={classes.pro}>
                &nbsp;PRO&nbsp;
              </Typography>
            )}
          </div>
          <Typography variant="h5" className={classes.email}>
            Email:
          </Typography>
          <Typography variant="h6">{authUser.email}</Typography>
          <br />
          <Typography variant="h5" className={classes.content}>
            Change Password:
          </Typography>
          <PasswordChangeForm />
          <LoginManagement authUser={authUser} />
          <br />
          {!isMember && (
            <>
              <Button variant="contained">
                <Link style={{ textDecoration: 'none' }} to={ROUTES.MEMBERSHIP}>
                  Become a member
                </Link>
              </Button>
            </>
          )}
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

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
      .then((activeSignInMethods) =>
        this.setState({ activeSignInMethods, error: null })
      )
      .catch((error) => this.setState({ error }));
  };

  onSocialLoginLink = (provider) => {
    this.props.firebase.auth.currentUser
      .linkWithPopup(this.props.firebase[provider])
      .then(this.fetchSignInMethods)
      .catch((error) => this.setState({ error }));
  };

  onUnlink = (providerId) => {
    this.props.firebase.auth.currentUser
      .unlink(providerId)
      .then(this.fetchSignInMethods)
      .catch((error) => this.setState({ error }));
  };

  onDefaultLoginLink = (password) => {
    const credential = this.props.firebase.emailAuthProvider.credential(
      this.props.authUser.email,
      password
    );

    this.props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(this.fetchSignInMethods)
      .catch((error) => this.setState({ error }));
  };

  render() {
    const { activeSignInMethods, error } = this.state;

    return (
      <div style={{ marginTop: '25px' }}>
        <Typography variant="h5">Modify Your Sign In Methods:</Typography>
        <ul>
          {SIGN_IN_METHODS.map((signInMethod) => {
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
        {error && console.log(error.message)}
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
    <Button
      type="button"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
    >
      Deactivate {signInMethod.id}
    </Button>
  ) : (
    <Button type="button" onClick={() => onLink(signInMethod.provider)}>
      Link {signInMethod.id}
    </Button>
  );

class DefaultLoginToggle extends Component {
  constructor(props) {
    super(props);

    this.state = { password: '', confirmPassword: '' };
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.props.onLink(this.state.password);
    this.setState({ password: '', confirmPassword: '' });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { onlyOneLeft, isEnabled, signInMethod, onUnlink } = this.props;

    const { password, confirmPassword } = this.state;

    const isInvalid = password !== confirmPassword || confirmPassword === '';

    return isEnabled ? (
      <Button
        type="button"
        onClick={() => onUnlink(signInMethod.id)}
        disabled={onlyOneLeft}
      >
        Deactivate {signInMethod.id}
      </Button>
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
    );
  }
}

const LoginManagement = withFirebase(LoginManagementBase);
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(AccountPage);
