import { Set, Map } from 'immutable';
import emailValidator from 'email-validator';

const validate = (values) => {
  const requiredFields = Set(['email', 'employeeReference']);
  let errors = requiredFields.reduce((currentErrors, fieldName) => {
    if (!values[fieldName]) {
      return currentErrors.set(fieldName, 'Required');
    }

    return currentErrors;
  }, Map());

  if (!errors.has('email') && !emailValidator.validate(values['email'])) {
    errors = errors.set('email', 'Email format is not valid');
  }

  return errors.toJS();
};

export default validate;
