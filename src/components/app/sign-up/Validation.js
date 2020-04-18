import { Set, Map } from 'immutable';
import emailValidator from 'email-validator';

const validate = (values) => {
  const requiredFields = Set(['email', 'password', 'retype-password', 'userType']);
  var errors = requiredFields.reduce((currentErrors, fieldName) => {
    if (!values[fieldName]) {
      return currentErrors.set(fieldName, 'Required');
    }

    return currentErrors;
  }, Map());

  if (!errors.has('email') && !emailValidator.validate(values['email'])) {
    errors = errors.set('email', 'Email format is not valid');
  }

  if (!errors.has('retype-password') && values['password'] !== values['retype-password']) {
    errors = errors.set('retype-password', 'Should match above password');
  }

  return errors.toJS();
};

export default validate;
