import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const renderComboBox = ({ input, label, defaultValue, meta: { touched, invalid, error, dirty }, ...custom }) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <Autocomplete clearOnEscape Autocomplete includeInputInList autoHighlight {...input} {...custom} />
    {touched && invalid && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);

export default renderComboBox;
