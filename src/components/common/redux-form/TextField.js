import React from 'react';
import TextField from '@material-ui/core/TextField';

const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => {
  const { defaultValue } = custom;
  const { value, ...restInput } = input;

  if (defaultValue) {
    return <TextField label={label} placeholder={label} error={touched && invalid} helperText={touched && error} {...restInput} {...custom} />;
  }

  return <TextField label={label} placeholder={label} error={touched && invalid} helperText={touched && error} {...input} {...custom} />;
};

export default renderTextField;
