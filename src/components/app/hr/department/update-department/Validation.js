import { Set, Map } from 'immutable';

const validate = (values) => {
  const requiredFields = Set(['name']);
  const errors = requiredFields.reduce((currentErrors, fieldName) => {
    if (!values[fieldName]) {
      return currentErrors.set(fieldName, 'Required');
    }

    return currentErrors;
  }, Map());

  return errors.toJS();
};

export default validate;
