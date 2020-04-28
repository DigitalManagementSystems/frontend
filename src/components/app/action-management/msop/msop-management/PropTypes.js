import PropTypes from 'prop-types';

export const frequencyProp = PropTypes.oneOf(['Daily', 'Weekly', 'Monthly']);

export const meetingDayProp = PropTypes.oneOf(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);

export const meetingDaysProp = PropTypes.arrayOf(meetingDayProp);

export const userProp = PropTypes.shape({
  email: PropTypes.string.isRequired,
});

export const employeeProp = PropTypes.shape({
  user: userProp.isRequired,
});

export const employeesProp = PropTypes.arrayOf(employeeProp);

export const departmentProp = PropTypes.shape({
  name: PropTypes.string.isRequired,
});

export const msopProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  meetingName: PropTypes.string.isRequired,
  meetingDuration: PropTypes.string.isRequired,
  frequency: frequencyProp.isRequired,
  meetingDays: meetingDaysProp.isRequired,
  agendas: PropTypes.string,
  department: departmentProp.isRequired,
  chairPersonEmployee: employeeProp.isRequired,
  actionLogSecretaryEmployee: employeeProp.isRequired,
  attendees: employeesProp.isRequired,
});

export const msopsProp = PropTypes.arrayOf(msopProp);

export const msopEdgeProp = PropTypes.shape({
  cursor: PropTypes.string.isRequired,
  node: msopProp.isRequired,
});

export const msopEdgesProp = PropTypes.arrayOf(msopEdgeProp);

export const relayMSOPs = PropTypes.shape({
  edges: msopEdgesProp.isRequired,
});

export const manufacturerProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  msops: relayMSOPs.isRequired,
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
