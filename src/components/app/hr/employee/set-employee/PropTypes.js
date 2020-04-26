import PropTypes from 'prop-types';

export const registeredUserProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
});

export const registeredUsersProp = PropTypes.arrayOf(registeredUserProp);

export const registeredUserEdgeProp = PropTypes.shape({
  cursor: PropTypes.string.isRequired,
  node: registeredUserProp.isRequired,
});

export const registeredUserEdgesProp = PropTypes.arrayOf(registeredUserEdgeProp);

export const relayRegisteredUsers = PropTypes.shape({
  edges: registeredUserEdgesProp.isRequired,
});

export const userRegisteredUsers = PropTypes.shape({
  id: PropTypes.string.isRequired,
  registeredUsers: relayRegisteredUsers.isRequired,
});

export const departmentProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

export const departmentsProp = PropTypes.arrayOf(departmentProp);

export const departmentEdgeProp = PropTypes.shape({
  cursor: PropTypes.string.isRequired,
  node: departmentProp.isRequired,
});

export const departmentEdgesProp = PropTypes.arrayOf(departmentEdgeProp);

export const relayRegisteredDepartments = PropTypes.shape({
  edges: departmentEdgesProp.isRequired,
});

export const departmentRegisteredDepartments = PropTypes.shape({
  id: PropTypes.string.isRequired,
  departments: relayRegisteredDepartments.isRequired,
});
