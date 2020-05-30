import React, { useState, useEffect } from 'react';
import Colors from '../Colors';
import Pixel from './Pixel';
import { withFirebase } from '../../Firebase';
import sound from '../../../assets/complete.wav';

const Canvas = (props) => {
  const { habit, makeConfetti, firebase } = props;
  const uid = firebase.auth.currentUser.uid;
  const [row, setRow] = useState([]);
  const audio = new Audio(sound);

  useEffect(() => {
    const fetchData = async () => {
      const trackingData = await firebase.getHabitTrackerEntry(uid, habit);
      setRow(trackingData);
    };
    fetchData();
  }, [firebase, habit, uid, setRow]);

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
    firebase.updateHabitTrackerEntry(uid, habit, newRow);
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
