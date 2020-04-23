import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { FormHelperText } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import { useStyles } from '../../theme';
import useForm from './useForm';

const initialState = {
  habit: '',
  category: 'career',
};

export default (props) => {
  const [values, handleChange] = useForm(initialState);
  const [showError, setShowError] = useState(false);
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.habit) {
      props.onSubmitNewHabit(values);
      handleChange(initialState);
    }
  };

  const handleHabitChange = (e) => {
    handleChange(e);
    if (e.target.value.length > 19) {
      setShowError(true);
    } else if (showError) {
      setShowError(false);
    }
  };

  return (
    <form>
      <TextField
        label="Habit name"
        className={classes.textField}
        margin="normal"
        value={values.habit}
        name="habit"
        onChange={handleHabitChange}
        inputProps={{ maxLength: 20 }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') e.preventDefault();
        }}
      />
      <TextField
        select
        label="Category"
        name="category"
        className={classes.textField}
        margin="normal"
        SelectProps={{
          native: true,
          MenuProps: {
            className: classes.menu,
          },
        }}
        value={values.category}
        onChange={handleChange}
      >
        <option value="career">Career</option>
        <option value="health">Health</option>
        <option value="growth">Learning</option>
        <option value="finance">Personal Finance</option>
        <option value="fam">Relationships</option>
      </TextField>
      <Tooltip title="Add Habit">
        <Fab
          color="primary"
          aria-label="add"
          size="small"
          className={classes.fab}
          onClick={handleSubmit}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      {showError && (
        <FormHelperText error={true} className={classes.leftSpacing}>
          Try to keep it less than 20 characters.
        </FormHelperText>
      )}
    </form>
  );
};
