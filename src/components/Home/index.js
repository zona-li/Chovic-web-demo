import React, { useState } from 'react';
import Canvas from './HabitBoard/Canvas';
import ColorPicker from './HabitBoard/ColorPicker';
import HabitItem from './HabitBoard/HabitItem';

const TheBoard = () => {
    const [color, setColor] = useState(0);  // Default color is white
    return (
        <div className={'board'}>
            <ColorPicker currentColor={color} setColor={color => setColor(color)} />
            <HabitItem habit={"Exercise"} />
            <Canvas currentColor={color} />
        </div>
    )
}

export default TheBoard;