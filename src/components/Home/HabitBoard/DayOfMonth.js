import React from 'react';
import Typography from '@material-ui/core/Typography';

import Pixel from './Pixel';

const DayOfMonth = () => {
    const date = new Date();
    const days = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    const daysArr = Array(days).fill().map((_, i) => i + 1);
    const monthMap = {
        0: 'January',
        1: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    };
    const month = monthMap[date.getMonth() + 1];
    const today = date.getDate();
    return (
        <>
            <Typography variant='h5' className={'month'}>{month} {date.getFullYear()}</Typography>
            <br />
            <div className={'habitList'}>
                {/* This is to make days of the month align with the habit pixel entry */}
                <div className={'habit'}></div>
                
                {daysArr.map((day, index) => {
                    return (
                        <Pixel
                            key={index}
                            day={day}
                            today={today}
                            background='white'
                            onClick={() => {}}
                        />
                    )
                })}
            </div>
        </>
    );
}

export default DayOfMonth;