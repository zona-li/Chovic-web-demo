import React from 'react';

import { HeaderLink } from '../../elements/Link';
import { Nav } from '../../elements/Nav';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthUserContext } from '../Session';

const Navigation = () => (
    <Nav>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? (
                    <NavigationAuth authUser={authUser} />
                ) : (
                    <NavigationNonAuth />
                )
            }
        </AuthUserContext.Consumer>
    </Nav>
);

const NavigationAuth = ({ authUser }) => (
    <div>
        <HeaderLink to={ROUTES.LANDING}>Landing</HeaderLink>
        <HeaderLink to={ROUTES.HOME}>Home</HeaderLink>
        <HeaderLink to={ROUTES.ACCOUNT}>Account</HeaderLink>
        {authUser.roles.includes(ROLES.ADMIN) && (
            <HeaderLink to={ROUTES.ADMIN}>Admin</HeaderLink>
        )}
        <SignOutButton />
    </div>
);

const NavigationNonAuth = () => (
    <div>
        <HeaderLink to={ROUTES.LANDING}>Landing</HeaderLink>
        <HeaderLink to={ROUTES.SIGN_IN}>Sign In</HeaderLink>
        <HeaderLink to={ROUTES.APPLICATION}>Apply</HeaderLink>
    </div>    
);


export default Navigation;