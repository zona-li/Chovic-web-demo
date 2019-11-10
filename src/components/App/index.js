import React from 'react';
import { 
    BrowserRouter as Router,
    Route,
 } from 'react-router-dom';

import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import MembershipSubscription from '../Application';
import SideDrawer from '../SideDrawer';
import ThankYou from '../ThankYou';
import Contact from '../Contact';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
    <Router>
        <div>
            <SideDrawer />

            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route exact path={ROUTES.HOME} component={HomePage} />
            <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route exact path={ROUTES.ADMIN} component={AdminPage} />
            <Route exact path={ROUTES.MEMBERSHIP} component={MembershipSubscription} />
            <Route exact path={ROUTES.CONFIRMATION} component={ThankYou} />
            <Route exact path={ROUTES.CONTACT} component={Contact} />
        </div>
    </Router>
);

export default withAuthentication(App);