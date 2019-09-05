import React, { useState, useEffect } from 'react';

import AddHabit from './AddHabit';
import HabitList from './HabitBoard/HabitList';
import DayOfMonth from './HabitBoard/DayOfMonth';

const TheBoard = props => {
    const { authUser, firebase } = props;
    const userId = authUser.uid;
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const existingHabits = await firebase.habits(userId);
            setHabits(existingHabits);
        }
        fetchData();
    }, [firebase, userId]);

    const addNewHabit = values => {
        const {habit, category} = values;
        firebase.addHabit(userId, habit, category)
            .then(() => {
                const updatedHabits = [...new Set([...habits, habit])];
                setHabits(updatedHabits);
            })
            .catch(() => {
                console.error(`Failed to add ${habit} to the database.`);
            });
    }

    return (
        <div className={'content'}>
            <AddHabit onSubmitNewHabit={addNewHabit} />
            <br />
            {habits.length === 0 ? '' : <DayOfMonth />}
            <HabitList habits={habits} userId={userId} />
        </div>
    );
}

export default TheBoard