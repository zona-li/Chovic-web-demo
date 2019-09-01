import React from 'react';
import useForm from './useForm';

const initialState = {
    habit: '',
    category: 'career'
};

export default props => {
    const [values, handleChange] = useForm(initialState);

    const handleSubmit = e => {
        e.preventDefault();
        if (values) {
            props.onSubmitNewHabit(values);
            handleChange(initialState);
        }
    }

    return (
        <form>
            <input
                placeholder="Add Habit"
                value={values.habit}
                name="habit"
                onChange={handleChange}
            />
            <select name="category" value={values.category} onChange={handleChange}>
                <option value="career">Career</option>
                <option value="finance">Finance</option>
                <option value="fam">Friends and Family</option>
                <option value="health">Health</option>
                <option value="fun">Fun</option>
                <option value="love">Love</option>
                <option value="growth">Growth</option>
                <option value="contribution">Contribution</option>
            </select>
            <button onClick={handleSubmit} >Add</button>
        </form>
    )
}