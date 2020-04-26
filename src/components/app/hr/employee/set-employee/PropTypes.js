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
