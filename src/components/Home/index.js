import React from 'react';
import { compose } from 'recompose';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { withFirebase } from '../Firebase';
import TheBoard from './Board';
import AddHabit from './AddHabit';
import { useHabits } from '../../Hooks/useHabits';

const HomeBase = ({ firebase, authUser }) => {
  const userId = authUser?.uid;
  const [habits, dispatch] = useHabits(firebase, userId);

  const addNewHabit = (values) => {
    const { habit, category } = values;
    firebase
      .addHabit(userId, habit, category)
      .then(() => {
        dispatch({ type: 'ADD_HABIT', payload: values });
      })
      .catch(() => {
        console.error(`Failed to add ${habit} to the database.`);
      });
  };

  return (
    <>
      <canvas id="confetti-page" />
      <div className="content">
        <AddHabit onSubmitNewHabit={addNewHabit} />
        <TheBoard allHabits={habits} dispatch={dispatch} />
      </div>
    </>
  );
};

const Home = ({ firebase }) => {
  return (
    <AuthUserContext.Consumer>
      {({ authUser }) => <HomeBase authUser={authUser} firebase={firebase} />}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(Home);
