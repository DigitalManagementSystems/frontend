import PropTypes from 'prop-types';

export const departmentProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
});

export const departmentsProp = PropTypes.arrayOf(departmentProp);

export const departmentEdgeProp = PropTypes.shape({
  cursor: PropTypes.string.isRequired,
  node: departmentProp.isRequired,
});

export const departmentEdgesProp = PropTypes.arrayOf(departmentEdgeProp);

export const relayDepartments = PropTypes.shape({
  edges: departmentEdgesProp.isRequired,
});

export const manufacturerProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  departments: relayDepartments.isRequired,
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
