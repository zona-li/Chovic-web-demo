import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { HeaderLink } from '../../elements/Link';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthUserContext } from '../Session';
import { List, ListItem } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  listItem: {
    padding: 20,
    paddingLeft: 90,
  },
}));

const Navigation = () => (
  <AuthUserContext.Consumer>
    {({ authUser }) =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

const HeaderListItem = ({ children }) => {
  const classes = useStyles();
  return <ListItem className={classes.listItem}>{children}</ListItem>;
};

const NavigationAuth = ({ authUser }) => (
  <>
    <List>
      <HeaderListItem>
        <HeaderLink to={ROUTES.LANDING}>Home</HeaderLink>
      </HeaderListItem>
      <HeaderListItem>
        <HeaderLink to={ROUTES.HOME}>Habits</HeaderLink>
      </HeaderListItem>
      <HeaderListItem>
        <HeaderLink to={ROUTES.ACCOUNT}>Account</HeaderLink>
      </HeaderListItem>
      <HeaderListItem>
        {authUser.roles && authUser.roles.includes(ROLES.ADMIN) && (
          <HeaderLink to={ROUTES.ADMIN}>Admin</HeaderLink>
        )}
      </HeaderListItem>
      <HeaderListItem>
        <SignOutButton />
      </HeaderListItem>
    </List>
  </>
);

const NavigationNonAuth = () => {
  return (
    <>
      <List>
        <HeaderListItem>
          <HeaderLink to={ROUTES.LANDING}>Home</HeaderLink>
        </HeaderListItem>
        <HeaderListItem>
          <HeaderLink to={ROUTES.SIGN_IN}>Sign In</HeaderLink>
        </HeaderListItem>
        <HeaderListItem>
          <HeaderLink to={ROUTES.CONTACT}>Contact</HeaderLink>
        </HeaderListItem>
      </List>
    </>
  );
};

export default Navigation;
