import React from 'react';

const Input = (props) => {
    return (
        <div>
            <label>{props.title}</label>
            <br />
            <input
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                type={props.type || "text"}
            />
        </div>
    )
}

export default Input;