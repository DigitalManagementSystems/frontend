import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

import Styles from './Styles';

export const MSOPView = ({
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
  onMSOPClick: PropTypes.func.isRequired,
};

export default createFragmentContainer(MSOPView, {
  msop: graphql`
    fragment MSOPView_msop on MSOP {
      id
      meetingName
      duration {
        id
        name
      }
      frequency {
        id
        name
      }
      meetingDays {
        id
        name
      }
      agendas
      department {
        name
      }
      chairPersonEmployee {
        user {
          email
        }
      }
      actionLogSecretaryEmployee {
        user {
          email
        }
      }
      attendees {
        user {
          email
        }
      }
    }
  `,
});
