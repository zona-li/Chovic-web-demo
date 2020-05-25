import React, { useState, useEffect } from 'react';
import ConfettiGenerator from 'confetti-js';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import AddHabit from './AddHabit';
import HabitList from './HabitBoard/HabitList';
import DayOfMonth from './HabitBoard/DayOfMonth';

const useStyles = makeStyles((theme) => ({
  noHabit: {
    marginLeft: theme.spacing(1),
  },
}));

const TheBoard = (props) => {
  const { authUser, firebase } = props;
  const userId = authUser.uid;
  const [habits, setHabits] = useState([]);
  // Whether habits are fetched from the DB.
  const [loaded, setLoaded] = useState(false);

  // Whether the user has any habit stored in the DB.
  const [hasHabit, setHasHabit] = useState(false);

  // Whether user just clicked on a habit pixel.
  const [habitChecked, setHabitChecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const existingHabits = await firebase.habits(userId);
      setHabits(existingHabits);
      setLoaded(true);
      console.log('fetched habits from DB ', existingHabits);
      if (!existingHabits.length) setHasHabit(false);
      else setHasHabit(true);
    };
    fetchData();
  }, [firebase, userId]);

  useEffect(() => {
    if (habits.length) {
      setHasHabit(true);
    } else {
      setHasHabit(false);
    }
  }, [habits]);

  useEffect(() => {
    const confettiSettings = { target: 'page', clock: '90' };
    const confetti = new ConfettiGenerator(confettiSettings);
    if (habitChecked) {
      confetti.render();
      setTimeout(() => {
        confetti.clear();
        setHabitChecked(false);
      }, 3000);
    }
  }, [habitChecked]);

  const addNewHabit = (values) => {
    const { habit, category } = values;
    firebase
      .addHabit(userId, habit, category)
      .then(() => {
        const updatedHabits = [...new Set([...habits, habit])];
        setHabits(updatedHabits);
      })
      .catch(() => {
        console.error(`Failed to add ${habit} to the database.`);
      });
  };

  return (
    <>
      <canvas id="page" />
      <div className="content">
        <AddHabit onSubmitNewHabit={addNewHabit} />
        <br />
        {loaded && hasHabit && <DayOfMonth />}
        {loaded && !hasHabit && <NoHabits />}
        <HabitList
          habits={habits}
          setHabits={setHabits}
          userId={userId}
          setHabitChecked={setHabitChecked}
        />
      </div>
    </>
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
