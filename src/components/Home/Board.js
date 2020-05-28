import React, { useState, useEffect } from 'react';
import ConfettiGenerator from 'confetti-js';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import AddHabit from './AddHabit';
import HabitList from './HabitBoard/HabitList';
import DayOfMonth from './HabitBoard/DayOfMonth';
import Spinner from '../../elements/Spinner';

const useStyles = makeStyles((theme) => ({
  noHabit: {
    marginLeft: theme.spacing(1),
  },
}));

const confettiSettings = { target: 'page', clock: '90' };

const TheBoard = (props) => {
  const { authUser, firebase } = props;
  const userId = authUser.uid;
  const [habits, setHabits] = useState([]);
  // Whether habits are fetched from the DB.
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  // Whether the user has any habit stored in the DB.
  const [hasHabit, setHasHabit] = useState(false);

  useEffect(() => {
    console.log('Fetching called', firebase, userId);
    const fetchData = async () => {
      const existingHabits = await firebase.habits(userId);
      setHabits(existingHabits);
      setLoaded(true);
      if (!existingHabits.length) setHasHabit(false);
      else setHasHabit(true);
    };
    setLoading(true);
    fetchData().then(() => {
      setLoading(false);
    });
  }, [firebase, userId]);

  useEffect(() => {
    if (habits.length) {
      setHasHabit(true);
    } else {
      setHasHabit(false);
    }
  }, [habits]);

  const makeConfetti = () => {
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    setTimeout(() => {
      confetti.clear();
    }, 3000);
  };

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
        {loading && <Spinner />}
        {loaded && hasHabit && <DayOfMonth />}
        {loaded && !hasHabit && <NoHabits />}
        <HabitList
          habits={habits}
          setHabits={setHabits}
          userId={userId}
          makeConfetti={makeConfetti}
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
