import React from 'react';
import Typography from '@material-ui/core/Typography';

const HabitItem = props => {
    return (
        <Typography variant="body2" className={'habit'}>{props.habit}</Typography>
    );
}

export default HabitItem;