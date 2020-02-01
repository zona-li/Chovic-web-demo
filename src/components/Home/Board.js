import React, { useState, useEffect } from 'react';
import ConfettiGenerator from "confetti-js";

import AddHabit from './AddHabit';
import HabitList from './HabitBoard/HabitList';
import DayOfMonth from './HabitBoard/DayOfMonth';

const TheBoard = props => {
    const { authUser, firebase } = props;
    const userId = authUser.uid;
    const [habits, setHabits] = useState([]);
    const [habitChecked, setHabitChecked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const existingHabits = await firebase.habits(userId);
            setHabits(existingHabits);
        }
        fetchData();
    }, [firebase, userId]);

    useEffect(() => {
        const confettiSettings = { target: "page", "clock": "90" };
        const confetti = new ConfettiGenerator(confettiSettings);
        if (habitChecked) {
            confetti.render();
            setTimeout(() => {
                confetti.clear();
                setHabitChecked(false);
            }, 3000);
        }
    }, [habitChecked])

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
        <>
            <canvas id="page" />
            <div className="content">
                <AddHabit onSubmitNewHabit={addNewHabit} />
                <br />
                {habits.length === 0 ? '' : <DayOfMonth />}
                <HabitList habits={habits} userId={userId} setHabitChecked={setHabitChecked} />
            </div>
        </>
    );
}

export default TheBoard