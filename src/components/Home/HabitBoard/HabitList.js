import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import HabitItem from './HabitItem';
import Canvas from './Canvas';

const HabitList = (props) => {
  const { habits, setHabitChecked } = props;
  const habitItems = habits.map((habit) => (
    <div className={'habitList'} key={habit}>
      <HabitItem habit={habit} />
      <Canvas
        habit={habit}
        userId={props.userId}
        setHabitChecked={setHabitChecked}
      />
      <HabitDelete />
    </div>
  ));

  return habitItems;
};

const HabitDelete = () => {
  return (
    <IconButton aria-label="delete" size="small">
      <HighlightOffIcon fontSize="small" className={'habitIconDelete'} />
    </IconButton>
  );
};

export default HabitList;
