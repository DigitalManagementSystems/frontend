import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

import { msopProp } from './PropTypes';
import Styles from './Styles';

const MSOPView = ({
  msop: { id, meetingName, duration, frequency, meetingDays, department, chairPersonEmployee, actionLogSecretaryEmployee, attendees, agendas },
  onMSOPClick,
}) => {
  const classes = Styles();

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={false} />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Link className={classes.link} onClick={() => onMSOPClick(id)}>
          {meetingName}
        </Link>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {duration.name}
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {frequency.name}
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {meetingDays.name}
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {department.name}
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {chairPersonEmployee.email}
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {actionLogSecretaryEmployee.email}
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {attendees.email}
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {agendas.email}
      </TableCell>
    </TableRow>
  );
};

MSOPView.propTypes = {
  msop: msopProp.isRequired,
  onMSOPClick: PropTypes.func.isRequired,
};

export default MSOPView;
