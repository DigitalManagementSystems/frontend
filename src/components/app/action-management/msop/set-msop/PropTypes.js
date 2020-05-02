import PropTypes from 'prop-types';

export const msopProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
});

export const userMSOPs = PropTypes.shape({
  id: PropTypes.string.isRequired,
  msop: msopProp.isRequired,
});
