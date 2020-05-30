import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Tooltip from '@material-ui/core/Tooltip';

import HabitItem from './HabitItem';
import Canvas from './Canvas';
import { withFirebase } from '../../Firebase';

const HabitList = (props) => {
  const { habits, dispatch, makeConfetti, firebase } = props;
  const habitItems = habits.map((habit) => (
    <div className={'habitList'} key={habit}>
      <HabitItem habit={habit} />
      <Canvas habit={habit} makeConfetti={makeConfetti} />
      <HabitDelete habit={habit} dispatch={dispatch} firebase={firebase} />
    </div>
  ));

  return habitItems;
};

const HabitDelete = ({ habit, dispatch, firebase }) => {
  const deleteHabit = () => {
    dispatch({ type: 'DELETE_HABIT', payload: habit });
    firebase
      .deleteHabit(firebase.auth.currentUser.uid, habit)
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
