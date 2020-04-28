import PropTypes from 'prop-types';

export const userProp = PropTypes.shape({
  email: PropTypes.string.isRequired,
});

export const reportingToEmployeeProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  user: userProp.isRequired,
});

export const departmentProp = PropTypes.shape({
  name: PropTypes.string.isRequired,
});

export const departmentsProp = PropTypes.arrayOf(departmentProp);

export const employeeProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  employeeReference: PropTypes.string,
  position: PropTypes.string,
  mobile: PropTypes.string,
  user: userProp.isRequired,
  departments: departmentsProp.isRequired,
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

export const manufacturerProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  employees: relayEmployees.isRequired,
});

export const manufacturersProp = PropTypes.arrayOf(manufacturerProp);

export const manufacturerEdgeProp = PropTypes.shape({
  cursor: PropTypes.string.isRequired,
  node: manufacturerProp.isRequired,
});

export const manufacturerEdgesProp = PropTypes.arrayOf(manufacturerEdgeProp);

export const relayManufacturers = PropTypes.shape({
  edges: manufacturerEdgesProp.isRequired,
});

export const rootUserProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  manufacturers: relayManufacturers.isRequired,
});
