import React from 'react';

const HabitItem = props => {
    return (
        <p className={'habit'}>{props.habit}</p>
    );
}

export default HabitItem;