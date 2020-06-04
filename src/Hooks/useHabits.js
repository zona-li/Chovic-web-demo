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
    case 'UPDATE_HABIT':
      const { habitName, habitEntry, monthSelected } = action.payload;
      const prevHabits = { ...state.habits };
      const prevHabit = { ...prevHabits[habitName] };
      return {
        ...state,
        habits: {
          ...prevHabits,
          [habitName]: {
            ...prevHabit,
            [monthSelected]: habitEntry,
          },
        },
      };
    case 'ADD_HABIT':
      const habits = { ...state.habits };
      habits[action.payload.habit] = {
        ...yearlyTrackingData,
        category: action.payload.category,
      };
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
