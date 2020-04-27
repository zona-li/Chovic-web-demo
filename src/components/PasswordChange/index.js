import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { withFirebase } from '../Firebase';
import useForm from '../Home/useForm';

const useStyles = makeStyles((theme) => ({
  inputField: {
    marginRight: 50,
  },
  button: {
    marginLeft: 50,
  },
}));

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
};

const PasswordChangeForm = (props) => {
  const [values, handleChange] = useForm(INITIAL_STATE);
  const [error, setError] = useState(null);
  const classes = useStyles();

  const onSubmit = (event) => {
    event.preventDefault();
    if (values) {
      props.firebase
        .doPasswordUpdate(values.passwordOne)
        .then(() => {
          handleChange(INITIAL_STATE);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        name="passwordOne"
        value={values.passwordOne}
        onChange={handleChange}
        type="password"
        placeholder="New Password"
        className={classes.inputField}
      />
      <TextField
        name="passwordTwo"
        value={values.passwordTwo}
        onChange={handleChange}
        type="password"
        placeholder="Confirm New Password"
      />
      <Button variant="outlined" className={classes.button} type="submit">
        Reset My Password
      </Button>
      <br />
      {error ? (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      ) : null}
    </form>
  );
};

export default withFirebase(PasswordChangeForm);
