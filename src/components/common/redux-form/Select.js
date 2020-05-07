import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const renderSelect = ({ input, label, labelId, meta: { touched, invalid, error, dirty }, ...custom }) => {
  const { defaultValue } = custom;

  if (defaultValue && !dirty) {
    input.onChange(defaultValue);
  }

  return (
    <FormControl>
      {label && labelId && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select labelId={labelId} {...input} {...custom} />
      {touched && invalid && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default renderSelect;
