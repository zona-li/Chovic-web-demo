import React from 'react';
import '../styles.css';

export default props => {
    const dayOfMonth = props.day;
    const pixelType = dayOfMonth ? 'day-of-month' : 'tracker';
    const className = props.background + ' pixel ' + pixelType;

    return (
        <div>
            {dayOfMonth ? (
                <div className={className}>{dayOfMonth}</div>
            ) : (
                <div 
                    className={className}
                    onClick={props.onClick}
                />
            )}
        </div>
    )
}