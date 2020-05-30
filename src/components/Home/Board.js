import React, { useState, useEffect } from 'react';
import ConfettiGenerator from 'confetti-js';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import HabitList from './HabitBoard/HabitList';
import DayOfMonth from './HabitBoard/DayOfMonth';
import Spinner from '../../elements/Spinner';

const useStyles = makeStyles((theme) => ({
  noHabit: {
    marginLeft: theme.spacing(1),
  },
}));

const confettiSettings = { target: 'confetti-page', clock: '90' };

const TheBoard = ({ habits, dispatch }) => {
  const habitsNames = Object.keys(habits);
  // Whether the user has any habit stored in the DB.
  const [hasHabit, setHasHabit] = useState(false);

  useEffect(() => {
    if (habitsNames.length) {
      setHasHabit(true);
    } else {
      setHasHabit(false);
    }
  }, [habitsNames]);

  const makeConfetti = () => {
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    setTimeout(() => {
      confetti.clear();
    }, 3000);
  };

  if (!hasHabit) return <NoHabits />;
  return (
    <div>
      <DayOfMonth />
      <HabitList
        habits={habitsNames}
        dispatch={dispatch}
        // setHabits={setHabits}
        // userId={userId}
        makeConfetti={makeConfetti}
      />
    </div>
  );
};

const NoHabits = () => {
  const classes = useStyles();
  return (
    <Typography variant="subtitle1" className={classes.noHabit}>
      There is no habit to show. Start by adding a new habit.
    </Typography>
  );
};

export default TheBoard;
