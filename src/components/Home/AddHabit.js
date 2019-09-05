import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useStyles } from '../../theme';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import useForm from './useForm';

const initialState = {
    habit: '',
    category: 'career'
};

export default props => {
    const [values, handleChange] = useForm(initialState);
    const classes = useStyles();

    const handleSubmit = e => {
        e.preventDefault();
        if (values) {
            props.onSubmitNewHabit(values);
            handleChange(initialState);
        }
    }

    return (
        <form>
            <TextField
                label="Add Habit"
                className={classes.textField}
                margin="normal"
                value={values.habit}
                name="habit"
                onChange={handleChange}
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
                <option value="finance">Finance</option>
                <option value="fam">Friends and Family</option>
                <option value="health">Health</option>
                <option value="fun">Fun</option>
                <option value="love">Love</option>
                <option value="growth">Growth</option>
                <option value="contribution">Contribution</option>
            </TextField>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleSubmit}>
                <AddIcon />
            </Fab>
        </form>
    )
}