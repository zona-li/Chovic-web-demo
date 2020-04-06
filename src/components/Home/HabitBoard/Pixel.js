import React from 'react';
import '../styles.css';

export default (props) => {
    const {day, today, background, onClick} = props;
    const pixelType = day ? 'day-of-month' : 'tracker';
    let className = background + ' pixel ' + pixelType;
    let todayDate = '';
    if (day === today && pixelType === 'day-of-month') {
        className = 'today';
        todayDate = 'todayDate'
    }
    

    return (
        <div>
            {day ? (
                <div className={className}>
                    <div className={todayDate}>{day}</div>
                </div>
            ) : (
                <div 
                    className={className}
                    onClick={onClick}
                />
            )}
        </div>
    )
}