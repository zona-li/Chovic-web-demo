import React from 'react';

import HabitItem from './HabitItem';
import Canvas from './Canvas';

const HabitList = props => {
    const habits = props.habits;
    const habitItems = habits.map(habit =>
        <div className={'habitList'} key={habit}>
            <HabitItem habit={habit} />
            <Canvas habit={habit} userId={props.userId} />
        </div>
    );
    
    return habitItems;
}

export default HabitList;