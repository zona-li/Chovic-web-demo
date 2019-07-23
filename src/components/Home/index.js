import React, { useState } from 'react';
import Canvas from './HabitBoard/Canvas';
import ColorPicker from './HabitBoard/ColorPicker';
import HabitItem from './HabitBoard/HabitItem';
import AddHabit from './AddHabit';

const TheBoard = () => {
    const [color, setColor] = useState(0);  // Default color is white
    const [habit, setHabit] = useState();

    return (
        <div className={'content'}>
            <div className={'board'}>
                <ColorPicker currentColor={color} setColor={color => setColor(color)} />
                <HabitItem habit={"Exercise"} />
                <Canvas currentColor={color} />
            </div>
        </div>
    )
}

export default TheBoard;