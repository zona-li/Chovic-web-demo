import React, { Component, useState } from 'react';
import Colors from '../Colors';
import Pixel from './Pixel';

const Canvas = props => {
    const [row, setRow] = useState(Array(30).fill().map(() => 0));
    const changeColor = (index) => {
        const newRow = JSON.parse(JSON.stringify(row));
        newRow[index] = props.currentColor;
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