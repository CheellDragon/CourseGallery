import React from 'react';
import {TextField, Grid, MenuItem} from '@mui/material';
import PropsTypes from 'prop-types';

const FormElement = (
    {
        name,
        select,
        required,
        label,
        value,
        onChange,
        multiline,
        rows,
        error,
        options,
        type,
    }
) => {
    let inputChildren = null;
    if(select) {
        inputChildren = options.map(option => (
            <MenuItem key={option._id} value={option._id}>
                {option.title}
            </MenuItem>
        ))
    }
    return (
        <Grid item xs={12}>
            <TextField
                value={value}
                type={type}
                select={select}
                helperText={error}
                error={!!error}
                onChange={onChange}
                required={required}
                name={name}
                variant='outlined'
                fullWidth
                rows={rows}
                label={label}
                multiline={multiline}
            >
                {inputChildren}
            </TextField>
        </Grid>
    )
}

FormElement.propTypes = {
    name: PropsTypes.string.isRequired,
    label: PropsTypes.string.isRequired,
    value: PropsTypes.string.isRequired,
    onChange: PropsTypes.func.isRequired,
    select: PropsTypes.bool,
    options: PropsTypes.arrayOf(PropsTypes.object),
    rows: PropsTypes.number,
    multiline: PropsTypes.bool,
    required: PropsTypes.bool,
    type: PropsTypes.string,
    error: PropsTypes.string
}

export default FormElement;