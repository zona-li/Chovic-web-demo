import React from 'react';
import styled from 'styled-components';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';

const HomePage = () => (
    <div>
        <h1>Home</h1>
        <p>Only accessible by signed in user.</p>
    </div>
);

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(HomePage);