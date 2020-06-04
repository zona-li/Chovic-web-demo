import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import HabitItem from './HabitItem';
import Canvas from './Canvas';
import { withFirebase } from '../../Firebase';
import habitCategory from '../../../constants/habitCategory';

const useStyles = makeStyles((theme) => ({
  categoryText: {
    color: theme.status.blue,
  },
}));

const HabitList = (props) => {
  const { habits } = props;
  const classes = useStyles();

  const habitsByCategory = {};
  habitCategory.forEach((category) => {
    habitsByCategory[category.toLowerCase()] = [];
  });

  Object.keys(habits).forEach((habit) => {
    const cat = habits[habit]['category'];
    if (habitsByCategory[cat]) habitsByCategory[cat].push(habit);
    else habitsByCategory[cat] = [habit];
  });

  const habitItems = Object.keys(habitsByCategory).map((category) => {
    const habitsInCategory = habitsByCategory[category];
    const habitsBundle = habitsInCategory.map((habit) => {
      return <HabitRow {...props} habit={habit} key={habit} />;
    });
    if (habitsInCategory.length > 0) {
      return (
        <div key={category}>
          <Typography variant="overline" className={classes.categoryText}>
            {category}
          </Typography>
          <Divider light={true} />
          <li>{habitsBundle}</li>
          <br />
        </div>
      );
    }
    return null;
  });

  return <ul className={'habitCategoryList'}>{habitItems}</ul>;
};

const HabitRow = ({
  habits,
  habit,
  monthSelected,
  dispatch,
  makeConfetti,
  firebase,
}) => {
  return (
    <div className={'habitList'}>
      <HabitItem habit={habit} />
      <Canvas
        monthSelected={monthSelected}
        habit={habits[habit]}
        habitName={habit}
        makeConfetti={makeConfetti}
        dispatch={dispatch}
      />
      <HabitDelete habit={habit} dispatch={dispatch} firebase={firebase} />
    </div>
  );
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
