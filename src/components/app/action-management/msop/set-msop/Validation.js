import { Set, Map } from 'immutable';

const validate = (values) => {
  const requiredFields = Set([
    'meetingName',
    'durationId',
    'frequencyId',
    'departmentId',
    'chairPersonEmployeeId',
    'actionLogSecretaryEmployeeId',
    'agendas',
  ]);
  const errors = requiredFields.reduce((currentErrors, fieldName) => {
    if (!values[fieldName]) {
      return currentErrors.set(fieldName, 'Required');
    }

    return currentErrors;
  }, Map());

  return errors.toJS();
};

export default validate;
