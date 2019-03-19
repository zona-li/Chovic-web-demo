import React from 'react';
import TextField from '@material-ui/core/TextField';

const Input = (props) => {
    return (
        <TextField
            name={props.name}
            label={props.title}
            value={props.value}
            onChange={props.onChange}
            style={{ margin: 18 }}
            fullWidth={props.fullWidth}
            type={props.type || "text"}
            error={props.error || false}
            helperText={props.helperText}
            multiline={props.multiline}
            // required
        />
    )
}

export default Input;