import React from 'react';
import Typography from '@material-ui/core/Typography';

import Pixel from './Pixel';

const DayOfMonth = () => {
    const date = new Date();
    const days = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    const daysArr = Array(days).fill().map((_, i) => i + 1);
    const monthMap = {
        0: 'Jan',
        1: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec'
    };
    const month = monthMap[date.getMonth()];
    return (
        <>
            <Typography variant='h5' className={'month'}>{month}</Typography>
            <div className={'habitList'}>
                {/* This is to make days of the month align with the habit pixel entry */}
                <div className={'habit'}></div>
                
                {daysArr.map((day, index) => {
                    return (
                        <Pixel
                            key={index}
                            day={day}
                            background='white'
                            onClick={e => {}}
                        />
                    )
                })}
            </div>
        </>
    );
}

export default DayOfMonth;