import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            /* It uses the Firebase listener to trigger a callback function
            every time the authenticated user changes. */
            this.listener = this.props.firebase.onAuthUserListener(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                },
                () => this.props.history.push(ROUTES.SIGN_IN),
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        /* The render method displays the passed component that should be 
        protected by this higher-order component. */
        render() {
            return (
                <AuthUserContext.Consumer>
                    {
                        /* Avoid showing the protected page before the redirect happens. */
                        authUser =>
                        condition(authUser) ? <Component {...this.props} /> : null
                    }
                </AuthUserContext.Consumer>
            );
        }
    }

    return compose(
        withRouter,
        withFirebase,
    )(WithAuthorization);
};  

export default withAuthorization;