import PropTypes from 'prop-types';

export const employeeProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  employeeReference: PropTypes.string,
});

export const employeesProp = PropTypes.arrayOf(employeeProp);

export const employeeEdgeProp = PropTypes.shape({
  cursor: PropTypes.string.isRequired,
  node: employeeProp.isRequired,
});

export const employeeEdgesProp = PropTypes.arrayOf(employeeEdgeProp);

export const relayEmployees = PropTypes.shape({
  edges: employeeEdgesProp.isRequired,
});

export const userEmployees = PropTypes.shape({
  id: PropTypes.string.isRequired,
  employees: relayEmployees.isRequired,
});
