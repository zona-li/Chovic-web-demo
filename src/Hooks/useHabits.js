import { useReducer, useEffect, createContext } from 'react';
import { yearlyTrackingData } from '../constants/initialHabitData';

export const HabitContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALL_HABITS':
      return {
        firstLoaded: true,
        habits: action.payload,
      };
    case 'ADD_HABIT':
      const habits = { ...state.habits };
      habits[action.payload] = yearlyTrackingData;
      return {
        ...state,
        habits: habits,
      };
    case 'DELETE_HABIT':
      const habitsLeft = { ...state.habits };
      delete habitsLeft[action.payload];
      return {
        ...state,
        habits: habitsLeft,
      };
    default:
      throw new Error();
  }
};

export const useHabits = (firebase, uid) => {
  const [habits, dispatch] = useReducer(reducer, {
    firstLoaded: false,
    habits: {},
  });

  useEffect(() => {
    const getAllHabits = async () => {
      const habits = await firebase.getAllHabits(uid);
      dispatch({ type: 'SET_ALL_HABITS', payload: habits });
    };
    getAllHabits();
  }, [dispatch, firebase, uid]);

  return [habits, dispatch];
};
