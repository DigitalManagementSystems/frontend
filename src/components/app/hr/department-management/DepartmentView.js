import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

import { departmentProp } from './PropTypes';
import Styles from './Styles';

const DepartmentView = ({ department: { id, name, description }, onDepartmentClick }) => {
  const classes = Styles();

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={false} />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Link className={classes.link} onClick={() => onDepartmentClick(id)}>
          {name}
        </Link>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {description}
      </TableCell>
    </TableRow>
  );
};

DepartmentView.propTypes = {
  department: departmentProp.isRequired,
  onDepartmentClick: PropTypes.func.isRequired,
};

export default DepartmentView;
