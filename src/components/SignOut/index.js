import React from 'react';

import { SignoutButton } from '../../elements/Button';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
    <SignoutButton type="button" onClick={firebase.doSignOut}>
        Sign Out
    </SignoutButton>
);

export default withFirebase(SignOutButton);