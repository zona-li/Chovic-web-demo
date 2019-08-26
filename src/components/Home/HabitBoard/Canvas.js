import React, { useState } from 'react';
import Colors from '../Colors';
import Pixel from './Pixel';

const Canvas = props => {
    const [row, setRow] = useState(Array(30).fill().map(() => 0));
    const changeColor = (index) => {
        const newRow = JSON.parse(JSON.stringify(row));
        let currentColorIndex = newRow[index];
        if (currentColorIndex + 1 > 3) currentColorIndex = 0;
        else currentColorIndex += 1;
        newRow[index] = currentColorIndex;
        setRow(newRow);
    }

    return (
        <div className={'canvas'}>
            {row.map((_, index) => {
                return (
                    <Pixel
                        key={index}
                        background={Colors[row[index]]}
                        onClick={e => changeColor(index)}
                    />
                )
            })}
        </div>
    );
}

export default Canvas;