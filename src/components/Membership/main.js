import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import { height } from '@material-ui/system';
import PaymentPage from './payment';

const useStyles = makeStyles(theme => ({
    root: {
        width: '50%',
        height: '100vh',
        marginLeft: '50vw'
    },
}));


const MembershipSubscriptionBase = props => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={8}>
            <PaymentPage />
        </Paper>
    );
}

const MembershipSubscription = withFirebase(MembershipSubscriptionBase)
export default MembershipSubscription;