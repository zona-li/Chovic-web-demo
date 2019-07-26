import React, { useState } from 'react'

export default props => {
    const [habit, setHabit] = useState('');

    const handleChange = e => setHabit(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        if (habit) {
            props.setHabits(habits => [...habits || [], habit]);
            setHabit('');
        }
    }

    return (
        <form>
            <input 
                placeholder="Add Habit"
                value={habit}
                onChange={handleChange}
            />
            <button onClick={handleSubmit} >Add</button>
        </form>
    )
}