import React, { Component, useState } from 'react';
import Colors from '../Colors';
import Pixel from './Pixel';

const Canvas = () => {
    const [row, setRow] = useState(Array(30).fill().map(() => 0));

    return (
        <div className={'canvas'}>
            <input type='text' />
            {row.map((_, index) => {
                return (
                    <Pixel
                        key={index}
                        background={Colors[row[index]]}
                    />
                )
            })}
        </div>
    );
}

export default Canvas;