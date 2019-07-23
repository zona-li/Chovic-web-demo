import React from 'react'

export default props => {
    const handleChange = e => props.setHabit(e.target.value);

    return (
        <form>
            <input 
                placeholder="Add Habit"
                value={props.habit}
                onChange={handleChange}
            />
            <button>Add</button>
        </form>
    )
}