import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

import { employeeProp } from './PropTypes';
import Styles from './Styles';

const EmployeeView = ({
  employee: {
    id,
    employeeReference,
    position,
    mobile,
    user: { email },
    departments,
    reportingToEmployee,
  },
  onEmployeeClick,
}) => {
  const classes = Styles();

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={false} />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Link className={classes.link} onClick={() => onEmployeeClick(id)}>
          {email}
        </Link>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {employeeReference}
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {position}
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {mobile}
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {departments
          .map((department) => department.name)
          .sort()
          .reduce((reduction, name) => reduction + ', ' + name, '')
          .substring(2)}
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {reportingToEmployee && (
          <Link className={classes.link} onClick={() => onEmployeeClick(reportingToEmployee.id)}>
            {reportingToEmployee.user.email}
          </Link>
        )}
      </TableCell>
    </TableRow>
  );
};

EmployeeView.propTypes = {
  employee: employeeProp.isRequired,
  onEmployeeClick: PropTypes.func.isRequired,
};

export default EmployeeView;
