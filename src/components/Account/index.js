import React, { Component, useState } from "react";
import { compose } from "recompose";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import PasswordChangeForm from "../PasswordChange";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from "../Session";
import { withFirebase } from "../Firebase";
import member from "../../assets/member.png";
import * as ROUTES from '../../constants/routes';

const useStyles = makeStyles(theme => ({
  pageTitle: {
    fontWeight: 500,
    marginBottom: 50
  },
  image: {
    marginLeft: 25
  },
  content: {
    marginTop: 30
  }
}));

const SIGN_IN_METHODS = [
  {
    id: "password",
    provider: null
  },
  {
    id: "google.com",
    provider: "googleProvider"
  }
];

const AccountPage = () => {
  const classes = useStyles();
  const [isMember, setIsMember] = useState(false);
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div
          style={{ position: "absolute", left: "10%", top: "5%", width: "60%" }}
        >
          {isMember && <img className={classes.image} src={member} alt="img1" />}
          <Typography variant="h4" className={classes.pageTitle}>
            Account
          </Typography>
          <Typography variant="h5">Email:</Typography>
          <Typography variant="h6">{authUser.email}</Typography>
          <br/>
          <Typography variant="h5" className={classes.content}>Change Password:</Typography>
          <PasswordChangeForm />
          <LoginManagement authUser={authUser}/>
          <PaymentInfo authUser={authUser} setIsMember={setIsMember} />
          {
            !isMember && 
            <Button variant="contained">
              <Link style={{ textDecoration: 'none' }} to={ROUTES.MEMBERSHIP}>Join Us!</Link>
            </Button>
          }
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

class PaymentInfoBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      last4: null
    };
  }

  componentDidMount() {
    // Fetch payment card info
    const { firebase, authUser, setIsMember } = this.props;
    const data = firebase.stripe_customer(authUser.uid);
    data.then(
      docs => {
        docs.forEach(doc => {
          this.setState({ last4: doc.data().last4 });
        });
      },
      err => {
        console.log(`Encountered error fetching stripe user: ${err}`);
      }
    ).then(
      _ => {if (this.state.last4) setIsMember(true);}
    );
  }

  render() {
    return null;
  }
}

class LoginManagementBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSignInMethods: [],
      error: null
    };
  }

  componentDidMount() {
    this.fetchSignInMethods();
  }

  fetchSignInMethods = () => {
    this.props.firebase.auth
      .fetchSignInMethodsForEmail(this.props.authUser.email)
      .then(activeSignInMethods =>
        this.setState({ activeSignInMethods, error: null })
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
      password
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
        <Typography variant="h5">Sign In Methods:</Typography>
        <ul>
          {SIGN_IN_METHODS.map(signInMethod => {
            const onlyOneLeft = activeSignInMethods.length === 1;
            const isEnabled = activeSignInMethods.includes(signInMethod.id);
            return (
              <li key={signInMethod.id}>
                {signInMethod.id === "password" ? (
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
  onUnlink
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

    this.state = { password: "", confirmPassword: "" };
  }

  onSubmit = event => {
    event.preventDefault();

    this.props.onLink(this.state.password);
    this.setState({ password: "", confirmPassword: "" });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { onlyOneLeft, isEnabled, signInMethod, onUnlink } = this.props;

    const { password, confirmPassword } = this.state;

    const isInvalid = password !== confirmPassword || confirmPassword === "";

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
const PaymentInfo = withFirebase(PaymentInfoBase);
const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(AccountPage);
