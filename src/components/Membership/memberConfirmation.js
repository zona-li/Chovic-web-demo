import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import  * as ROUTES from '../../constants/routes';


const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(3, 3),
      margin: theme.spacing(10, 40),
      backgroundColor: 'Snow'
    },
    button: {
        display: 'block',
        margin: '0 auto',
    }
}));

const MemberConfirmationPage = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper} elevation={10}>
            <div>
                <Typography component='p'>
                    <span role='img' aria-label=''>🎉</span>Congratulations! You are part of the Chovic family now!
                </Typography>
                <br/>
                <Button className={classes.button}>
                    <Link to={ROUTES.HOME} style={{ textDecoration: 'none' }}>Take me to my homepage</Link>
                </Button>
            </div>
        </Paper>
    )
}

export default MemberConfirmationPage;