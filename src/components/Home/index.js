import React, { useState } from 'react';
import ColorPicker from './HabitBoard/ColorPicker';
import AddHabit from './AddHabit';
import HabitList from './HabitBoard/HabitList';

const TheBoard = () => {
    const [color, setColor] = useState(0);  // Default color is white
    const [habits, setHabits] = useState([]);

    return (
        <div className={'content'}>
            <AddHabit setHabits={habits => setHabits(habits)} />
            <ColorPicker 
                currentColor={color} 
                setColor={color => setColor(color)} 
            />

            <div>
                <HabitList currentColor={color} habits={habits} />
            </div>
        </div>
    );
}

export default TheBoard;