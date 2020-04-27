import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const renderAutocomplete = ({ input, label, meta: { touched, invalid, error, dirty }, ...custom }) => {
  const { defaultValue } = custom;

  if (defaultValue && !dirty) {
    input.onChange(defaultValue);
  }

  const onChange = (event, value) => {
    input.onChange(value);
  };

  const onBlur = (event) => {
    input.onBlur();
  };

  const { value, ...restInput } = input;

  return (
    <Autocomplete
      clearOnEscape
      Autocomplete
      includeInputInList
      autoHighlight
      {...restInput}
      onChange={onChange}
      onBlur={onBlur}
      {...custom}
      renderInput={(params) => (
        <TextField
          margin="normal"
          label={label}
          placeholder={label}
          error={touched && invalid}
          helperText={touched && error}
          required={custom.required}
          {...params}
          variant="outlined"
        />
      )}
    />
  );
};

export default renderAutocomplete;
