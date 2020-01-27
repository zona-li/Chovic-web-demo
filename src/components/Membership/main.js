import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { withFirebase } from '../Firebase';
import PaymentPage from './payment';
import ProductPage from './product';

const useStyles = makeStyles(theme => ({
    rootLeft: {
        marginTop: '5%',
        marginLeft: '5%',
        width: '45%',
        height: '85vh',
        marginRight: '50vw',
        float: "left"
    },
    rootRight: {
        width: '50%',
        height: '100vh',
        marginLeft: '50vw'
    },
}));


const MembershipSubscriptionBase = () => {
    const classes = useStyles();

    return (
        <>
            <Paper className={classes.rootLeft} elevation={8}>
                <ProductPage />
            </Paper>
            <div className={classes.rootRight} elevation={8}>
                <PaymentPage />
            </div>
        </>
    );
}

const MembershipSubscription = withFirebase(MembershipSubscriptionBase)
export default MembershipSubscription;