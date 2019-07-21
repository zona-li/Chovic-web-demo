import React from 'react';
import '../styles.css';

export default props => {
    const selected = props.current ? 'current-color' : '';
    const className = props.background + ' pixel ' + selected;
    return (
        <div 
            className={className}
            onClick={props.onClick}
        />
    )
}