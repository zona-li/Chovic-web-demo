import React from 'react';
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
import TheBoard from './Board';

const Home = () => {
    return (
        <AuthUserContext.Consumer>
            {authUser => (
                <TheBoard authUser={authUser} />
            )}
        </AuthUserContext.Consumer>
    )
}


const condition = authUser => !!authUser;

export default compose (
    withEmailVerification,
    withAuthorization(condition),
    withFirebase,
)(Home);
