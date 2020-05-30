import { useReducer, useEffect, createContext } from 'react';
import { yearlyTrackingData } from '../constants/initialHabitData';

export const HabitContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALL_HABITS':
      return action.payload;
    case 'ADD_HABIT':
      return {
        ...state,
        [action.payload]: yearlyTrackingData,
      };
    case 'DELETE_HABIT':
      const habitsLeft = { ...state };
      delete habitsLeft[action.payload];
      return habitsLeft;
    default:
      throw new Error();
  }
};

export const useHabits = (firebase, uid) => {
  const [habits, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    const getAllHabits = async () => {
      const habits = await firebase.getAllHabits(uid);
      console.log('init habit hook >>>>>', habits);
      dispatch({ type: 'SET_ALL_HABITS', payload: habits });
    };
    getAllHabits();
  }, [dispatch, firebase, uid]);

  return [habits, dispatch];
};
