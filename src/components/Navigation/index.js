import React from 'react';

import { HeaderLink } from '../../elements/Link';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthUserContext } from '../Session';
import { Nav } from '../../elements/Nav';
import { List, ListItem } from '@material-ui/core';

const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? (
                <NavigationAuth authUser={authUser} />
            ) : (
                <NavigationNonAuth />
            )
        }
    </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
    <Nav>
        <List>
            <ListItem>
                <HeaderLink to={ROUTES.LANDING}>Chovic</HeaderLink>
            </ListItem>
        </List>
        <List>
            <ListItem>
                <HeaderLink to={ROUTES.HOME}>Home</HeaderLink>
            </ListItem>
        </List>
        <List>
            <ListItem>
                <HeaderLink to={ROUTES.ACCOUNT}>Account</HeaderLink>
            </ListItem>
        </List>
        <List>
            <ListItem>
                {authUser.roles && authUser.roles.includes(ROLES.ADMIN) && (
                    <HeaderLink to={ROUTES.ADMIN}>Admin</HeaderLink>
                )}
            </ListItem>
        </List>
        <List>
            <ListItem>
                <SignOutButton />
            </ListItem>
        </List>
    </Nav>
);

const NavigationNonAuth = () => (
    <Nav>
        <List>
            <ListItem>
                <HeaderLink to={ROUTES.LANDING}>Chovic</HeaderLink>
            </ListItem>
        </List>
        <List>
            <ListItem>
                <HeaderLink to={ROUTES.SIGN_IN}>Sign In</HeaderLink>
            </ListItem>
        </List>
        <List>
            <ListItem>
                <HeaderLink to={ROUTES.APPLICATION}>Apply</HeaderLink>
            </ListItem>
        </List>
        <List>
            <ListItem>
                <HeaderLink to={ROUTES.CONTACT}>Contact</HeaderLink>
            </ListItem>
        </List>
    </Nav>    
);


export default Navigation;