import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withEmailVerification = Component => {
    class WithEmailVerification extends React.Component {
        constructor(props) {
            super(props);

            this.state = { isSent: false };
        }

        onSendEmailVerification = () => {
            const res = this.props.firebase.doSendEmailVerification();
            res.then(() => this.setState({ isSent: true }));
        };

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser => 
                        needsEmailVerification(authUser) ? (
                            <div style={{ position: "absolute", left: "10%", top: "5%", width: "70%" }}>
                                {this.state.isSent ? (
                                    <div>
                                        <Typography variant="h6">
                                            E-Mail confirmation sent. Refresh this page once you confirmed your E-Mail.
                                        </Typography>
                                    </div>
                                ) : (
                                    <div>
                                        <Typography variant="h6">
                                            Verify your email: Check you emails (spam folder
                                            included) for a confirmation email.
                                        </Typography>
                                        <br/>
                                        <Button
                                            variant="contained"
                                            onClick={this.onSendEmailVerification}
                                            disabled={this.state.isSent}
                                        >
                                            Resend
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Component {...this.props} />
                        )
                    }
                </AuthUserContext.Consumer>
            );
        }
    }

    return withFirebase(WithEmailVerification);
};

const needsEmailVerification = authUser =>
    authUser &&
    !authUser.emailVerified &&
    authUser.providerData
        .map(provider => provider.providerId)
        .includes('password');

export default withEmailVerification;