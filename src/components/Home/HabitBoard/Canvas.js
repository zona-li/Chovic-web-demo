import React, { useState, useEffect } from 'react';
import Colors from '../Colors';
import Pixel from './Pixel';
import { withFirebase } from '../../Firebase';

const Canvas = props => {
    const { userId, habit, firebase } = props;
    const [row, setRow] = useState(Array(30).fill().map(() => 0));

    useEffect(() => {
        const fetchData = async () => {
            const trackingData = await firebase.getHabitTrackerEntry(userId, habit);
            setRow(trackingData);
            console.log(trackingData);
        }
        fetchData();
        console.log("fetch habit data gets called, habit:", habit);
    }, [habit]);

    const changeColor = (index) => {
        const newRow = JSON.parse(JSON.stringify(row));
        let currentColorIndex = newRow[index];
        if (currentColorIndex + 1 > 3) currentColorIndex = 0;
        else currentColorIndex += 1;
        newRow[index] = currentColorIndex;
        setRow(newRow);
        firebase.updateHabitTrackerEntry(userId, habit, newRow);
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

export default withFirebase(Canvas);