import React from 'react';
import TextField from '@material-ui/core/TextField';

const Input = (props) => {
    return (
        <div>
            <TextField
                name={props.name}
                label={props.title}
                value={props.value}
                onChange={props.onChange}
                style={{ margin: 28 }}
                fullWidth={props.fullWidth}
                type={props.type || "text"}
                error={props.error || false}
                helperText={props.helperText}
            />
        </div>
    )
}

export default Input;