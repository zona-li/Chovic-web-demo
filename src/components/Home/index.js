import React, { useState } from 'react';
import Canvas from './HabitBoard/Canvas';
import ColorPicker from './HabitBoard/ColorPicker';

const TheBoard = () => {
    const [color, setColor] = useState(0);  // Default color is white
    return (
        <div className={'board'}>
            <ColorPicker currentColor={color} setColor={color => setColor(color)} />
            <input type='text' className={'habit'} />
            <Canvas currentColor={color} />
        </div>
    )
}

export default TheBoard;