import PropTypes from 'prop-types';

export const departmentProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
});

export const userDepartments = PropTypes.shape({
  id: PropTypes.string.isRequired,
  department: departmentProp.isRequired,
});
