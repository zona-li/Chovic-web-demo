import React from 'react';

import Pixel from './Pixel';

const DayOfMonth = props => {
    const date = new Date();
    const days = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    const daysArr = Array(days).fill().map((_, i) => i + 1);
    return (
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
    );
}

export default DayOfMonth;