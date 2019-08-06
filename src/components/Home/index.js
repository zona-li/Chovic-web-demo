import React from 'react';
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
import TheBoard from './Board';

const Home = props => {
    return (
        <AuthUserContext.Consumer>
            {authUser => (
                <TheBoard authUser={authUser} firebase={props.firebase} />
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
