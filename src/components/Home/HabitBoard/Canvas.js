import React, { useState, useEffect } from 'react';
import Colors from '../Colors';
import Pixel from './Pixel';
import { withFirebase } from '../../Firebase';
import sound from '../../../assets/complete.wav';

const Canvas = (props) => {
  const {
    habit,
    dispatch,
    habitName,
    makeConfetti,
    monthSelected,
    firebase,
  } = props;
  const uid = firebase.auth.currentUser.uid;
  const [row, setRow] = useState(habit[monthSelected]);
  const audio = new Audio(sound);

  useEffect(() => {
    setRow(habit[monthSelected]);
  }, [habit, monthSelected]);

  const onHabitPixelClicked = (index) => {
    // Update color
    const newRow = JSON.parse(JSON.stringify(row));
    let currentColorIndex = newRow[index];
    if (currentColorIndex + 1 > 3) {
      currentColorIndex = 0;
    } else {
      currentColorIndex += 1;
      // Play sound and confetti
      audio.play();
      makeConfetti();
    }

    newRow[index] = currentColorIndex;
    setRow(newRow);
    firebase.updateHabitTrackerEntry(uid, habitName, monthSelected, newRow);

    const values = {
      habitName,
      monthSelected,
      habitEntry: newRow,
    };
    dispatch({ type: 'UPDATE_HABIT', payload: values });
  };

  return (
    <div className={'canvas'}>
      {row.map((_, index) => {
        return (
          <Pixel
            key={index}
            background={Colors[row[index]]}
            onClick={() => onHabitPixelClicked(index)}
          />
        );
      })}
    </div>
  );
};

export default withFirebase(Canvas);
