import React from 'react';
import styled from 'styled-components';
import { withAuthorization } from '../Session';

const HomePage = () => (
    <div>
        <h1>Home</h1>
        <p>Only accessible by signed in user.</p>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);