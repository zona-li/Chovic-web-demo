import { useState } from 'react';

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    return [
        values,
        e => {
            e.target ? 
            // event is from submitting the form
            setValues({
                ...values,
                [e.target.name]: e.target.value
            }) :
            // event is from a funciton calling setValues directly
            setValues(e);
        }
    ];
};

export default useForm;