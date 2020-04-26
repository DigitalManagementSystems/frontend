import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const renderRadioGroup = ({ input, label, defaultValue, meta: { touched, invalid, error }, ...custom }) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <RadioGroup {...input} {...custom} />
    {touched && invalid && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);

export default renderRadioGroup;
