import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Tooltip from '@material-ui/core/Tooltip';

import HabitItem from './HabitItem';
import Canvas from './Canvas';
import { withFirebase } from '../../Firebase';

const HabitList = (props) => {
  const { habits, setHabits, setHabitChecked, firebase } = props;
  const habitItems = habits.map((habit) => (
    <div className={'habitList'} key={habit}>
      <HabitItem habit={habit} />
      <Canvas
        habit={habit}
        userId={props.userId}
        setHabitChecked={setHabitChecked}
      />
      <HabitDelete
        habit={habit}
        habits={habits}
        setHabits={setHabits}
        firebase={firebase}
      />
    </div>
  ));

  return habitItems;
};

const HabitDelete = ({ habit, habits, setHabits, firebase }) => {
  const deleteHabit = () => {
    const newHabits = habits.filter((oldHabit) => oldHabit !== habit);
    setHabits(newHabits);
    firebase
      .deleteHabit(firebase.auth.currentUser.uid, habit)
      .then(function () {
        console.log('Habit successfully deleted!');
      })
      .catch(function (error) {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <Tooltip title="Remove Habit">
      <IconButton aria-label="delete" size="small" onClick={deleteHabit}>
        <HighlightOffIcon fontSize="small" className={'habitIconDelete'} />
      </IconButton>
    </Tooltip>
  );
};

export default withFirebase(HabitList);
